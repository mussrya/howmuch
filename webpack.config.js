// In webpack.config.js
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + '/app/index.html',
    filename: 'index.html',
    inject: 'body'
});

module.exports = {
    entry: [
        './app/index.js'
    ],
    output: {
        path: __dirname + '/',
        filename: "index_bundle.js"
    },
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
            {test: /\.css$/, exclude: /node_modules/, loader: "style-loader!css-loader"}
        ]
    },
    plugins: [HTMLWebpackPluginConfig, new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production')
        }
    }),
        new webpack.optimize.UglifyJsPlugin()]
};