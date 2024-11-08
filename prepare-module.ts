#!/usr/bin/env node
import { promises as fs } from 'fs'

const srcDir  = './src'
const destDir = '.';

async function getNamespace() {
	const name = JSON.parse(await fs.readFile('package.json', 'utf8')).name
	return name.startsWith('@')
		? name.slice(0, name.indexOf('/'))
		: undefined
}

(async () => {
	const namespace = await getNamespace()

	const files = await fs.readdir(srcDir)
	for (const file of files) {
		const srcPath  = srcDir  + '/' + file
		const destPath = destDir + '/' + file
		if (file.endsWith('.js')) {
			let content = (await fs.readFile(srcPath, 'utf8'))
			if (namespace) {
				content = content
					.replace(new RegExp(`import(.*)from\s+'..\/node_modules\/${namespace}\/`, 'g'), "import$1from '../")
					.replace(/import(.*)from\s+'..\/node_modules\//g, "import$1from '../../")
			}
			else {
				content = content
					.replace(/import(.*)from\s+'..\/node_modules\//g, "import$1from '../")
			}
			await fs.writeFile(destPath, content, 'utf8')
		}
		else if (file.endsWith('.d.ts')) {
			await fs.copyFile(srcPath, destPath)
		}
	}
})().catch()
