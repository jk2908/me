import type { RootLayoutClasses } from '@jk2908/cxx'

import { cxx, Style } from '@jk2908/cxx'

import './styles.css'
import { Aside } from './ui/aside'
import { Footer } from './ui/footer'
import { Wrapper } from './ui/wrapper'

const { styles, styleProps } = cxx.embed.tag<RootLayoutClasses>('RootLayout')`
  .page {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
		padding-block-start: 0px;
    padding-block-end: var(--space-6x);

		@media (width >= 720px) {
			padding-block-start: var(--space-6x);
		}
  }

  .footer {
    margin-block-start: auto;
  }
`

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" dir="ltr">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta
					name="description"
					content="Personal website of Jerome Kenway, software engineer based in the UK"
				/>

				<link
					rel="preload"
					as="font"
					type="font/woff2"
					href="/fonts/lunchtype22-regular-webfont.woff2"
					crossOrigin="anonymous"
				/>

				<Style {...styleProps} />
			</head>

			<body>
				<Aside />

				<Wrapper className={styles.page}>
					<main>{children}</main>

					<Footer className={styles.footer} />
				</Wrapper>
			</body>
		</html>
	)
}
