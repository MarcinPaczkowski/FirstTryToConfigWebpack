const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require("path");

const webpackConfig = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'app.bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'WeeklyWebDevChallengeIssue02',
            hash: true,
            template: './src/index.html'
        }),
        new CleanWebpackPlugin(['dist']),
        new ExtractTextPlugin({
            filename: "styles.bundle.css",
            disable: false,
            allChunks: true
        }),
    ],
    module: {
        rules: [
        {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'sass-loader'],
                publicPath: "/dist"
            })
        }, 
        {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            }
        }, 
        {
            test: /\.(png|jpe?g|gif|svg)$/,
            use: [
            {
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]',
                    outputPath: 'img/'
                }  
            }]
        },
        {
            test: /\.html$/,
            use: [{
                loader: 'html-loader',
                options: {
                    minimize: true
                }
            }
        ]}
    ]},
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 8080,
        stats: "errors-only",
        open: true
    }
};

module.exports = webpackConfig; 