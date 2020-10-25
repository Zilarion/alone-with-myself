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
            'karma-spec-reporter',
            'karma-jasmine',
            'karma-jasmine-dom-matchers',
            'karma-typescript',
            'karma-chrome-launcher',
        ],
        preprocessors: {
            'src/**/*.ts': 'karma-typescript',
        },
        reporters: [ 'spec', 'karma-typescript' ],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: [ 'Chrome' ],
        singleRun: false,
        concurrency: Infinity,
        karmaTypescriptConfig: {
            tsconfig: './tsconfig.json',
            coverageOptions: {
                exclude: [
                    /\.(d|spec|test)\.ts$/i,
                    /index\.ts/i,
                ],
            },
        },
    });
};
