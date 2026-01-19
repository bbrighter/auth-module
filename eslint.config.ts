import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import { defineConfig, globalIgnores } from 'eslint/config'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import sonarjs from 'eslint-plugin-sonarjs'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig([
    reactHooks.configs.flat.recommended,
    tseslint.configs.recommended,
    reactRefresh.configs.vite,
    js.configs.recommended,
    stylistic.configs.recommended,
    sonarjs.configs.recommended,
    globalIgnores(['dist', 'coverage', '.dependency-cruiser.cjs']),
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        plugins: {
            'simple-import-sort': simpleImportSort,
        },
        rules: {
            'quotes': ['error', 'single'],
            'comma-dangle': ['error', 'always-multiline'],
            'object-curly-spacing': ['error', 'always'],
            'no-console': 'warn',

            'simple-import-sort/imports': 'warn',
            'simple-import-sort/exports': 'error',

            '@stylistic/indent': ['error', 4],
            '@stylistic/jsx-indent-props': 'off',

            'react/react-in-jsx-scope': 'off',
            'react-hooks/exhaustive-deps': 'off',

            'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
            '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        },
    },
])
