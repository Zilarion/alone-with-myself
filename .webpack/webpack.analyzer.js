const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const analyzer = {
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            reportFilename: './report.html',
        }),
    ],
};

module.exports = analyzer;
