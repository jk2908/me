import { Link } from '@jk2908/solas/router'
import { type AsideClasses, cxx } from '@jk2908/cxx'
import { clsx } from 'clsx'

const [css, styles, href] = cxx.tag<AsideClasses>('Aside')`
  .aside {
    @media (width >= 720px) {
      inline-size: 170px;
    }

    @media (width >= 1024px) {
      inline-size: 200px;
    }
  }

  .nav {
    display: flex;
    flex-direction: row;
    gap: var(--space-3x);
		padding-block: var(--space-6x);
    padding-inline: var(--space-6x);

    @media (width >= 720px) {
      flex-direction: column;
      gap: var(--space);
			inset-block-start: 0px;
			position: sticky;
    }

		a {
			inline-size: fit-content;
		}
  }

  .title {
    font-size: 16px;
  }
`

const links = [
	{
		name: 'Home',
		href: '/',
	},
	{
		name: 'Writing',
		href: '/writing',
	},
] as const

export function Aside({ className, ...rest }: React.ComponentPropsWithRef<'aside'>) {
	return (
		<>
			<aside className={clsx(styles.aside, className)} {...rest}>
				<nav className={styles.nav}>
					{links.map(l => (
						<Link key={l.href} href={l.href}>
							{l.name}
						</Link>
					))}
				</nav>
			</aside>

			<style href={href} precedence="medium">
				{css}
			</style>
		</>
	)
}
