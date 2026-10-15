import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { defineConfig } from 'vite'

import solas from '@jk2908/solas'
import cloudflare from '@jk2908/solas/adapters/cloudflare'
import cxx from '@jk2908/cxx/vite'
import mdsrc from '@jk2908/mdsrc'
import react from '@vitejs/plugin-react'

const resolver = (p: string) => resolve(dirname(fileURLToPath(import.meta.url)), p)

export default defineConfig(() => {
	return {
		plugins: [
			solas({
				url: process.env.SITE_URL ?? 'http://localhost:8787',
				prerender: 'ppr',
				precompress: false,
				adapter: cloudflare(),
				sitemap: {
					// `__`-prefixed posts are private and are not routable
					routes: routes => routes.filter(route => !route.includes('__')),
				},
				metadata: {
					title: '%s - Jerome Kenway',
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
		resolve: {
			alias: {
				'#': resolver('./'),
			},
		},
	}
})
