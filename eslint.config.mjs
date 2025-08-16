import { includeIgnoreFile } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const gitignorePath = fileURLToPath(new URL('.gitignore', import.meta.url));

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

const eslintConfig = [
	...compat.extends(
		'next/core-web-vitals',
		'next/typescript',
		'@tanstack/eslint-plugin-query'
	),
	includeIgnoreFile(gitignorePath, 'Imported .gitignore patterns'),
];

export default eslintConfig;
