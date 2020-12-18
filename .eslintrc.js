module.exports = {
    'env': {
        'browser': true,
        'es6': true,
        'node': true,
    },
    'extends': [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:react/recommended',
        "plugin:react-hooks/recommended",
    ],
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly',
    },
    "settings": {
        "react": {
            "version": "detect",
        }
    },
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaVersion': 2018,
        'sourceType': 'module',
        'project': './tsconfig.json',
        'extraFileExtensions': ['.ts', '.d.ts'],
        "ecmaFeatures": {
          "jsx": true
        },
    },
    'plugins': [
        '@typescript-eslint',
        'react',
    ],
    'rules': {
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
        'brace-style': [
            'error',
            '1tbs',
            {
                'allowSingleLine': false
            }
        ],
        'curly': [
            'error',
            'all',
        ],
        'indent': [
            'error',
            4,
        ],
        'quotes': [
            'error',
            'single',
        ],
        'semi': [
            'error',
            'always',
        ],
        'comma-dangle': [
            'error',
            'always-multiline',
        ],
        'eol-last': [
            'error',
            'always',
        ],
        'no-tabs': 'error',
        'no-console': 1,
        'no-var': 2,
        'no-multi-spaces': 2,
        'no-irregular-whitespace': 2,
        'no-trailing-spaces': 2,
        'no-restricted-globals': [
            'error',
            {
                'name': 'fdescribe',
                'message': 'Avoid commiting fdescribe, use describe instead.'
            },
            {
                'name': 'fit',
                'message': 'Avoid commiting fit, use it instead.'
            }
        ],
        'space-in-parens': [
            'error',
            'never',
        ],
        'array-bracket-spacing': [
            'error',
            'always',
        ],
        'object-curly-spacing': [
            'error',
            'always',
        ],
        'object-curly-newline': ['error', {
            'ObjectExpression': {
                'multiline': true,
                'minProperties': 2,
            },
            'ObjectPattern': {
                'multiline': true,
                'minProperties': 2,
            },
            'ImportDeclaration': {
                'multiline': true,
                'minProperties': 2,
            },
            'ExportDeclaration': {
                'multiline': true,
                'minProperties': 2,
            },
        }],
        'eqeqeq': ['error', 'always', { 'null': 'never' }],
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/prefer-nullish-coalescing': 'error',
        '@typescript-eslint/prefer-string-starts-ends-with': 'error',
        '@typescript-eslint/member-ordering': [
            'error',
            {
                'default': [
                    'public-static-field',
                    'public-static-method',
                    'protected-static-field',
                    'protected-static-method',
                    'private-static-field',
                    'private-static-method',
                    'public-instance-field',
                    'protected-instance-field',
                    'private-instance-field',
                    'public-constructor',
                    'protected-constructor',
                    'private-constructor',
                    'public-instance-method',
                    'protected-instance-method',
                    'private-instance-method'
                ]
            }
        ],
        '@typescript-eslint/member-delimiter-style': 'error',
    }
};
