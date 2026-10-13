import { cxx, type WrapperClasses } from '@jk2908/cxx'
import { clsx } from 'clsx'

const [css, styles, href] = cxx.tag<WrapperClasses>('Wrapper')`
  :where(.wrapper) {
    inline-size: 100%;
    padding-block: var(--space-6x);
    padding-inline: var(--space-6x);
    max-inline-size: 75ch;
  }
`

export function Wrapper({
	children,
	className,
	...rest
}: React.ComponentPropsWithRef<'div'>) {
	return (
		<>
			<div className={clsx(styles.wrapper, className)} {...rest}>
				{children}
			</div>

			<style href={href} precedence="medium">
				{css}
			</style>
		</>
	)
}
