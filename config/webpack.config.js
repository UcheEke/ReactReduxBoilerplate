'use strict';
let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const VENDOR_LIBS = [
    "axios",
    "react",
    "react-dom",
    "react-redux",
    "react-router",
    "redux",
    "redux-form",
    "redux-promise"
];

module.exports = {
    entry: {
        bundle: path.resolve('src','index.js'),
        vendor: VENDOR_LIBS
    },
    output: {
        path: path.join(__dirname, '../dist'),
        filename: '[name].[chunkhash].js',
        publicPath: './'
    },
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.jsx?$/,
                exclude: /node_modules/
            },
            {
                loader: ExtractTextPlugin.extract(
                    { loader: 'css-loader'}
                ),
                test: /\.css$/
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new ExtractTextPlugin('style.css')
    ],
    devServer: {
        historyApiFallback: true,
        contentBase: path.join(__dirname,"../dist"),
        publicPath: '/'
    }
};