module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: [
            'jasmine',
            'karma-typescript',
            'jasmine-dom-matchers',
        ],
        files: [
            'src/**/*.ts',
        ],
        client: { clearContext: false },
        plugins: [
            'karma-jasmine',
            'karma-jasmine-dom-matchers',
            'karma-typescript',
            'karma-chrome-launcher',
        ],
        preprocessors: {
            'src/**/*.ts': 'karma-typescript',
        },
        reporters: [ 'karma-typescript' ],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: [ 'Chrome' ],
        singleRun: false,
        concurrency: Infinity,
        karmaTypescriptConfig: {
            tsconfig: './tsconfig.json',
            // bundlerOptions: {
            //     sourceMap: true,
            //     transforms: [
            //         require('karma-typescript-es6-transform')(),
            //     ],
            // },
            coverageOptions: {
                exclude: [
                    /\.(d|spec|test)\.ts$/i,
                    /index\.ts/i,
                ],
            },
        },
    });
};
