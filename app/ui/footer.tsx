import { cxx } from '@jk2908/cxx'
import clsx from 'clsx'

import deploy from '../../deploy.json' with { type: 'json' }

const { styles } = cxx.extract.tag('Footer')`
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
		</>
	)
}
