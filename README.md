[![npm version](https://img.shields.io/npm/v/@itrocks/prepare-module?logo=npm)](https://www.npmjs.org/package/@itrocks/prepare-module)
[![npm downloads](https://img.shields.io/npm/dm/@itrocks/prepare-module)](https://www.npmjs.org/package/@itrocks/prepare-module)
[![GitHub](https://img.shields.io/github/last-commit/itrocks-ts/prepare-module?color=2dba4e&label=commit&logo=github)](https://github.com/itrocks-ts/prepare-module)
[![issues](https://img.shields.io/github/issues/itrocks-ts/prepare-module)](https://github.com/itrocks-ts/prepare-module/issues)
[![discord](https://img.shields.io/discord/1314141024020467782?color=7289da&label=discord&logo=discord&logoColor=white)](https://discord.gg/WFPJjmUx)

# prepare-module

Prepare your front-end module with dependencies for npm publishing.

## Pre-requisites

- Your project is a library you intend to publish on [npm](https://www.npmjs.com),
- your project contains front-end ESM scripts in a `src` subfolder,
- your transpiler generates transpiled `.js` and `.d.ts` files into `src`,
- you want to `import ... from '@itrocks/something'` without TypeScript errors.

## Installation

Install `@itrocks/prepare-module` as a development dependency:
```bash
npm i @itrocks/prepare-module --save-dev
```

## Usage

In your project, install the required dependency
and import the necessary front-end script with a relative path:
```ts
import { SortedArrayBy } from '../node_modules/@itrocks/sorted-array/sorted-array.js'
```

Then, add the following to your  **packages.json** file:
```json
{
	"scripts": {
		"prepare": "prepare-module"
	}
}
```

## How It Works

When your publish your package using `npm publish`, `prepare-module` will handle the following tasks:
- Copies your `js` script and `.d.ts` files from `src` to your project root directory, 
- Updates the import paths in your script to relative imports within `node_modules`, as shown below.

If your project is published under the same namespace as the dependency:
```ts
import { SortedArrayBy } from '../sorted-array/sorted-array.js'
```

If published under a different namespace:
```ts
import { SortedArrayBy } from '../../@itrocks/sorted-array/sorted-array.js'
```

If published without a namespace:
```ts
import { SortedArrayBy } from '../@itrocks/sorted-array/sorted-array.js'
```

## Deployment

When coding with TypeScript, avoid deploying files in `src/*.js`:
the scripts in your project root directory are the final ones to be used.

See a complete use case in the [@itrocks/build](https://github.com/itrocks-ts/build) library.
