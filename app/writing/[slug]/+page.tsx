import { useMemo } from 'react'

import type { Route, Solas } from '@jk2908/solas'
import { abort } from '@jk2908/solas/navigation'
import { cxx, type WritingSlugClasses } from '@jk2908/cxx'
import { allPosts } from '@jk2908/mdsrc'
import clsx from 'clsx'

const [css, styles, href] = cxx.tag<WritingSlugClasses>('WritingSlug')`
	.meta {
		align-items: baseline;
		display: flex;
		flex-wrap: wrap;
		margin-block-end: var(--space-3x);
	}

	.excerpt {
		font-family: var(--font-serif);
		margin-block-end: var(--space-6x);
	}

	.poster {
		margin-block-end: var(--space-6x);
	}

	.article > p + p {
		margin-block-start: var(--space-4x);
	}

	.article > p:has(img) {
		margin-block: var(--space-6x);
	}
`

export const metadata: Route.Metadata<Solas.Routes['/writing/:slug']> = ({ params }) => {
	const post = allPosts?.find(p => p.__mdsrc.slug === params?.slug)

	return {
		title: post?.title ?? 'Post not found',
	}
}

export const staticParams: Route.StaticParams<Solas.Routes['/writing/:slug']> = () =>
	allPosts?.map(p => ({ slug: p.__mdsrc.slug })) ?? []

export default function Page({ params }: Route.Props<Solas.Routes['/writing/:slug']>) {
	const post = allPosts?.find(p => p.__mdsrc.slug === params?.slug)

	if (!post || post.draft) abort(404, 'Post not found')

	const publishedAt = useMemo(() => {
		const date = new Date(post.publishedAt)
		const parts = new Intl.DateTimeFormat('en-GB').formatToParts(date)

		return parts.map(p => (p.type === 'literal' ? '.' : p.value)).join('')
	}, [post.publishedAt])

	return (
		<>
			<div className={styles.meta}>
				<h1 className="heading">
					{post.title}—<span className="text-sm normal italic">{publishedAt}</span>
				</h1>
			</div>

			{post.excerpt && <p className={styles.excerpt}>{post.excerpt}</p>}

			{post.poster && (
				<img
					src={post.poster.src}
					alt={post.poster.alt ?? ''}
					className={clsx('w-full', styles.poster)}
				/>
			)}

			{post.html && (
				<article
					dangerouslySetInnerHTML={{ __html: post.html }}
					className={styles.article}
				/>
			)}

			<style href={href} precedence="medium">
				{css}
			</style>
		</>
	)
}
