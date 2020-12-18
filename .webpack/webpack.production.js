const TerserPlugin = require('terser-webpack-plugin');
const TSLoader = require('./ts-loader.config');

const production = {
    mode: 'production',
    devtool: 'source-map',
    optimization: { minimizer: [ new TerserPlugin() ] },
    module: {
        rules: [
            TSLoader('tsconfig.prod.json'),
        ],
    },
    output: {
        filename: '[name].[contenthash].min.js',
        libraryTarget: 'umd',
        globalObject: '(typeof self !== \'undefined\' ? self : this)',
    },
};

module.exports = production;
