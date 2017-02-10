var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: ['./src/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: 'color-magic.js',
        library: "ColorMagic",
        libraryTarget: "var"
    },
    module: {
    loaders: [
        {
            test: /\.js$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        },
        {
            test: /\.json$/, 
            loader: "json-loader"
        }
    ]},
    stats: {
        colors: true
    },
    devtool: 'source-map',
    plugins: [
        new webpack.optimize.DedupePlugin(),
    ]
};