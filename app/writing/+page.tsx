import type { Route } from '@jk2908/solas'
import { Link } from '@jk2908/solas/router'
import { allPosts } from '@jk2908/mdsrc'

export const metadata = {
	title: 'Writing',
} satisfies Route.Metadata

const posts = allPosts
	?.toSorted((a, b) => {
		const dateA = new Date(a.publishedAt).getTime()
		const dateB = new Date(b.publishedAt).getTime()

		return dateB - dateA
	})
	.map((p, i) => {
		const body = p.html ?? ''
		const excerpt = p.excerpt
			? p.excerpt
			: body.indexOf('\n') > -1
				? body.slice(0, body.indexOf('\n'))
				: body.slice(0, 200)

		const date = new Date(p.publishedAt)
		const parts = new Intl.DateTimeFormat('en-GB').formatToParts(date)
		const publishedAt = parts.map(p => (p.type === 'literal' ? '.' : p.value)).join('')

		return {
			...p,
			num: i + 1,
			excerpt,
			publishedAt,
		}
	})
	.filter(p => !p.draft)

export default function Page() {
	return (
		<>
			<h1 className="sr-only">Writing</h1>

			{posts?.length ? (
				posts.map(p => (
					<article key={p.__mdsrc.slug}>
						<h2 className="heading mb-3">
							<Link href={`/writing/${p.__mdsrc.slug}`}>{p.title}</Link>—
							<span className="text-sm normal italic">{p.publishedAt}</span>
						</h2>

						{p.excerpt && <p className="mb-6 serif">{p.excerpt}</p>}

						{p.poster && (
							<img src={p.poster.src} alt={p.poster.alt ?? ''} className="w-full mb-4" />
						)}

						<Link href={`/writing/${p.__mdsrc.slug}`}>Read more</Link>
					</article>
				))
			) : (
				<p>No words have been written yet.</p>
			)}
		</>
	)
}
