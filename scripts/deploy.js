import { execSync } from 'node:child_process'
import { access, copyFile, mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const sourcePath = path.join(root, 'deploy.json')
const outputPath = path.join(root, 'dist', 'deploy.json')

function getPayload() {
	return `${JSON.stringify({ updatedAt: new Date().toISOString() }, null, 2)}\n`
}

function getBranch() {
	if (process.env.GITHUB_REF_NAME) return process.env.GITHUB_REF_NAME

	return execSync('git branch --show-current', {
		cwd: root,
		encoding: 'utf8',
	}).trim()
}

async function exists(filePath) {
	try {
		await access(filePath)
		return true
	} catch {
		return false
	}
}

async function main() {
	if (process.env.CI === 'true' && getBranch() === 'main') {
		await writeFile(sourcePath, getPayload(), 'utf8')
	}

	if (!(await exists(sourcePath))) return

	await mkdir(path.dirname(outputPath), { recursive: true })
	await copyFile(sourcePath, outputPath)
}

await main()
