const path = require('path');
const merge = require('webpack-merge').merge;
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TSLoader = require('./.webpack/ts-loader.config');
const CSSLoader = require('./.webpack/css-loader.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATH = {
    src: path.join(__dirname, './src'),
    build: path.join(__dirname, './dist'),
    config: path.join(__dirname, './tsconfig.json'),
};

const production = require('./.webpack/webpack.production');
const development = require('./.webpack/webpack.development');
const analyzer = require('./.webpack/webpack.analyzer');

const base = {
    entry: './index.tsx',
    context: PATH.src,
    output: { path: PATH.build },
    target: 'web',
    module: {
        rules: [
            TSLoader,
            CSSLoader,
            // FIXME: Temporarily required until webpack updates their dependencies.
            {
                test: /\.m?js/,
                resolve: { fullySpecified: false },
            },
        ],
    },
    resolve: { extensions: [ '.js', '.ts', '.tsx' ] },
    plugins: [
        new ForkTsCheckerWebpackPlugin({ typescript: { configFile: PATH.config } }),
        new HtmlWebpackPlugin({ template: 'index.html' }),
    ],
};

module.exports = (env = {}, args) => {
    const mode = args.mode ? args.mode : 'production';
    const config = (() => {
        switch (mode) {
        case 'production':
            return merge(base, production);
        case 'development':
            return merge(base, development);
        }
    })();
    return env.analyze ? merge(config, analyzer) : config;
};
