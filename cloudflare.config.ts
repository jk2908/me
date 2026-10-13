import { defineConfig, defineWorker } from 'cf/config'

export default defineConfig({
	worker: defineWorker({
		name: 'jeromes-casa',
		domains: ['jerome.ink', 'www.jerome.ink', 'jeromes.casa', 'www.jeromes.casa'],
		workersDev: true,
		compatibilityDate: '2026-10-02',
		compatibilityFlags: ['nodejs_compat'],
	}),
})
