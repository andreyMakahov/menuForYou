var path = require('path');
var webpack = require('webpack');

module.exports = function() {
    return {
        context: __dirname,

        entry: {
            bundle: './src/index.js'
        },

        output: {
            filename: '[name].js',

        },

        resolve: {
            extensions: ['', '.js', '.jsx']
        },

        module: {
            loaders: [
                {
                    test: /\.jsx?$/,
                    exclude: [/node_modules/],
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015', 'react', 'stage-2'],
                        plugins: [
                            'transform-decorators-legacy',
                        ]
                    }
                },
                {
                    test: /\.json$/,
                    loader: 'json'
                }
            ]
        }
    }
};
