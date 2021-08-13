module.exports = (configFile) => ({
    test: /\.tsx?$/,
    exclude: /(node_modules)/,
    use: [{
        loader: 'ts-loader',
        options: {
            transpileOnly: true,
            configFile,
        },
    }]
});
