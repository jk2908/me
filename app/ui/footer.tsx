import { cxx, type FooterClasses } from '@jk2908/cxx'
import clsx from 'clsx'

import deploy from '../../deploy.json' with { type: 'json' }

const [css, styles, href] = cxx.tag<FooterClasses>('Footer')`
  .footer {
    font-size: var(--text-sm);
		padding-block-start: var(--space-6x);
  }
`

export function Footer({ className, ...rest }: React.ComponentPropsWithRef<'footer'>) {
	return (
		<>
			<footer className={clsx(styles.footer, className)} {...rest}>
				Last updated: {deploy.updatedAt}
			</footer>

			<style href={href} precedence="medium">
				{css}
			</style>
		</>
	)
}
