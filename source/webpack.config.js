var path = require("path");

sassLoaders = [
  'css-loader?sourceMap',
  'postcss-loader?sourceMap',
  'sass-loader?sourceMap'
]

var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = [
    {
        name: "javascript",
        devtool: 'source-map',
        entry: {
            javascript: "./js/init.es6"
        },
        output: {
            path: '../html/js',
            filename: "bundle.js"
        },
        module: {
            loaders: [
                {
                    test: /\.es6$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: 'babel' 
                },
                {
                    test: /\.jade$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: 'jade-loader'
                  }
            ]
        }
    },
    {
        name: "styles",
        entry: "./scss/main.scss",
        output: {
            path: '../html/css',
            filename: "bundle.css"
        },
        module: {
            loaders: [
                {
                    test: /\.scss$/,
                    loader: ExtractTextPlugin.extract(sassLoaders)
                }
            ]
        },
        plugins: [
            new ExtractTextPlugin("bundle.css")
        ]
    }
];