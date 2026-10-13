import type { Route } from '@jk2908/solas'

import { Projects } from './ui/projects'

export const metadata = {
	title: 'Home',
} satisfies Route.Metadata

export default function Page() {
	return (
		<>
			<article>
				<h1 className="heading semibold">Jerome Kenway</h1>

				<p className="mt-4">
					Product oriented software engineer from London and as of 2025, based in
					Brighton, UK.
				</p>

				<p className="mt-4">
					By day, I work on products for clients across media, healthcare and SaaS. When
					not doing that, I might be working on personal projects like{' '}
					<a
						href="https://github.com/jk2908/solas"
						target="_blank"
						rel="noopener noreferrer external">
						Solas
					</a>
					, making illegible typefaces or out running.
				</p>

				<p className="mt-4">
					Contact me via <a href="mailto:jeromekenway@gmail.com">email</a> or find me on{' '}
					<a
						href="https://www.github.com/j2908/"
						target="_blank"
						rel="noopener noreferrer external">
						GitHub
					</a>
					.
				</p>
			</article>

			<article className="mt-8">
				<h2 className="heading mb-4 semibold">Projects</h2>

				<Projects />
			</article>
		</>
	)
}
