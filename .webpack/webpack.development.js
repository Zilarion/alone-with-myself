const path = require('path');
const TSLoader = require('./ts-loader.config');

const debug = {
    mode: 'development',
    devtool: 'inline-source-map',
    module: {
        rules: [
            TSLoader('tsconfig.dev.json'),
        ],
    },
    output: {
        filename: '[name].js',
        libraryTarget: 'umd',
        globalObject: '(typeof self !== \'undefined\' ? self : this)',
    },
    devServer: {
        compress: true,
        port: 9000,
        historyApiFallback: true,
        static: {
            directory: path.join(__dirname, 'dist'),
        },
    },
};

module.exports = debug;
