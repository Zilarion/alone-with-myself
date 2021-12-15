const path = require('path');
const merge = require('webpack-merge').merge;
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const CSSLoader = require('./.webpack/css-loader.config');

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
            CSSLoader,
            // FIXME: Temporarily required until webpack updates their dependencies.
            {
                test: /\.m?js/,
                resolve: { fullySpecified: false },
            },
        ],
    },
    resolve: {
        plugins: [
            new TsConfigPathsPlugin({ configFile: PATH.config }),
        ],
        extensions: [ '.js', '.ts', '.tsx' ],
    },
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
