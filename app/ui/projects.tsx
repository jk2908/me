'use client'

import { cxx, type ProjectsClasses } from '@jk2908/cxx'
import { allProjects } from '@jk2908/mdsrc'
import { clsx } from 'clsx'

const [css, styles, href] = cxx.tag<ProjectsClasses>('Projects')`
  .projects {
    display: flex;
    flex-direction: column;
  }

  .item {
		cursor: pointer;
    list-style: none;
		padding-block-end: var(--space-4x);

		@media (hover: hover) and (pointer: fine) {
		  &:hover {
				.inner {
					font-style: italic;
					opacity: 60%;
				}

				.subheading > a {
					text-decoration: none;
				}
			}
		}
  }

	.item + .item {
		border-block-start: 1px solid currentColor;
		padding-block-start: var(--space-4x);
	}

	.head {
		align-items: center;
		display: flex;
		justify-content: space-between;
	}

	.subheading {
		flex-grow: 1;
		font-size: var(--text-base);
		font-weight: 400;
		margin-block-end: var(--space);
	}

	.year {
		font-size: var(--text-sm);
		font-style: italic;
		font-weight: normal;
	}
`

const projects = allProjects.toSorted((a, b) => {
	const yearOne =
		typeof a.year === 'number' ? a.year : Number(a.year.toString().split('-')[0])
	const yearTwo =
		typeof b.year === 'number' ? b.year : Number(b.year.toString().split('-')[0])

	if (yearTwo !== yearOne) return yearTwo - yearOne

	const publishedAtOne = new Date(a.publishedAt).getTime()
	const publishedAtTwo = new Date(b.publishedAt).getTime()

	return publishedAtTwo - publishedAtOne
})

export function Projects({ className, ...rest }: React.ComponentPropsWithRef<'ul'>) {
	return (
		<>
			{projects.length ? (
				<ul className={clsx(styles.projects, className)} {...rest}>
					{projects.map(p => (
						<li
							key={p.__mdsrc.slug}
							onClick={() => {
								if (!p.repo) return
								window.open(p.repo, '_blank', 'noopener,noreferrer')
							}}
							onKeyDown={event => {
								if (event.key !== 'Enter' && event.key !== ' ') return
								if (!p.repo) return

								event.preventDefault()
								window.open(p.repo, '_blank', 'noopener,noreferrer')
							}}
							className={styles.item}>
							<div className={styles.inner}>
								<div className={styles.head}>
									<h3 className={clsx('subheading', styles.subheading)}>
										<a href={p.repo} target="_blank" rel="noopener noreferrer external">
											{p.title}
										</a>
										—<span className={styles.year}>{p.year}</span>
									</h3>
								</div>

								{p.html && <div dangerouslySetInnerHTML={{ __html: p.html }} />}
								{/*{p.Component && <p.Component />}*/}
							</div>
						</li>
					))}
				</ul>
			) : (
				<p>Nothing is recent.</p>
			)}

			<style href={href} precedence="medium">
				{css}
			</style>
		</>
	)
}
