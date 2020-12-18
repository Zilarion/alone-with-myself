const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;
const styledComponentsTransformer = createStyledComponentsTransformer();

module.exports = {
    test: /\.tsx?$/,
    exclude: /(node_modules)/,
    use: [{
        loader: 'ts-loader',
        options: {
            transpileOnly: true,
            getCustomTransformers: () => ({ before: [styledComponentsTransformer] })
        },
    }]
};
