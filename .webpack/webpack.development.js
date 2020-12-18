const path = require('path');

const debug = {
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
        filename: '[name].js',
        libraryTarget: 'umd',
        globalObject: '(typeof self !== \'undefined\' ? self : this)',
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        historyApiFallback: true,
    },
};

module.exports = debug;
