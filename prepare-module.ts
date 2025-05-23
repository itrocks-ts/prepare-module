#!/usr/bin/env node
import { promises as fs } from 'fs'

const srcDir  = './' + (process.argv[2] || 'src')
const destDir = '.'

async function prepareModules()
{

	const namespace = await getNamespace()
	const case1     = RegExp(`../node_modules/${namespace}/`, 'g')
	const case2     = RegExp(`../node_modules/`, 'g')
	const case3     = RegExp(`from.*'../../`, 'g')

	async function getNamespace()
	{
		const name = JSON.parse(await fs.readFile('package.json', 'utf8')).name
		return name.startsWith('@')
			? name.slice(0, name.indexOf('/'))
			: undefined
	}

	async function prepareDir(srcDir: string, destDir: string)
	{
		for (const file of await fs.readdir(srcDir)) {
			const srcPath  = srcDir  + '/' + file
			const destPath = destDir + '/' + file
			if ((file[0] !== '.') && (await fs.lstat(srcPath)).isDirectory()) {
				try   { await fs.access(destPath) }
				catch { await fs.mkdir(destPath)  }
				await prepareDir(srcPath, destPath)
				continue
			}
			if (file.endsWith('.js')) {
				let content = (await fs.readFile(srcPath, 'utf8'))
				content = namespace
					? content.replace(case1, '../').replace(case2, '../../')
					: content.replace(case2, '../')
				content = content.replace(case3, "from '../")
				await fs.writeFile(destPath, content, 'utf8')
			}
			else if (file.endsWith('.d.ts')) {
				await fs.copyFile(srcPath, destPath)
			}
		}
	}

	await prepareDir(srcDir, destDir)

}

prepareModules().catch().then()
