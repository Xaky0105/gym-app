module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true,
    },
    extends: ['plugin:react/recommended', 'prettier'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint', 'react-hooks', 'prettier', 'simple-import-sort'],
    rules: {
        'prefer-const': 'error',
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/display-name': 'off',
        'react/prop-types': 'off',
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        'prettier/prettier': 'error',
    },
    overrides: [
        {
            files: ['**/*.js', '**/*.ts', '**/*.tsx'],
            rules: {
                'simple-import-sort/imports': [
                    'error',
                    {
                        groups: [
                            // `react` first, `next` second, then packages starting with a character
                            ['^react$', '^next', '^[a-z]'],
                            // Packages starting with `@`
                            ['^@'],
                            // Packages starting with `~`
                            ['^~'],
                            // Imports starting with `../`
                            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
                            // Imports starting with `./`
                            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
                            // Style imports
                            ['^.+\\.s?css$'],
                            // Side effect imports
                            ['^\\u0000'],
                        ],
                    },
                ],
            },
        },
    ],
};
