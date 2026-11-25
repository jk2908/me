import { defineConfig } from 'vite'

import solas from '@jk2908/solas'
import cloudflare from '@jk2908/solas/adapters/cloudflare'
import cxx from '@jk2908/cxx/vite'
import mdsrc from '@jk2908/mdsrc'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
	return {
		plugins: [
			solas({
				url: process.env.SITE_URL ?? 'http://localhost:8787',
				prerender: 'ppr',
				precompress: false,
				adapter: cloudflare(),
				...(mode === 'production'
					? {
							csp: {
								directives: {
									'default-src': ['self'],
									'script-src': ['self'],
									'style-src': ['self'],
									'img-src': ['self', 'data:'],
									'font-src': ['self'],
									'object-src': ['none'],
									'base-uri': ['self'],
									'frame-ancestors': ['none'],
								},
							},
						}
					: {}),
				sitemap: {
					// `__`-prefixed posts are private and are not routable
					routes: routes => routes.filter(route => !route.includes('__')),
				},
				metadata: {
					title: '%s - Jerome Kenway',
					link: [
						{
							rel: 'icon',
							href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🐲</text></svg>',
						},
					],
				},
				router: {
					cache: {
						// enable in dev too for testing
						mode: 'prerendered',
					},
				},
			}),
			react(),
			cxx(),
			mdsrc({
				collections: [
					{
						name: 'Post',
						dir: 'posts',
						schema: {
							title: 'string',
							publishedAt: 'date',
							'excerpt?': 'string',
							'poster?': {
								src: 'string',
								'alt?': 'string',
							},
							'draft?': 'boolean',
						},
					},
					{
						name: 'Project',
						dir: 'projects',
						schema: {
							title: 'string',
							year: 'number|string',
							repo: 'string',
							'draft?': 'boolean',
							publishedAt: 'string',
						},
					},
				],
			}),
		],
	}
})
