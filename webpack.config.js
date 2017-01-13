var path = require('path');
var webpack = require('webpack');

module.exports = {
    context: __dirname,
    entry: {
        bundle: './src/index.js'
    },
    output: {
        filename: '[name].js',
        path: './build/',
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: [/node_modules/],
                loader: "babel-loader",
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
};
