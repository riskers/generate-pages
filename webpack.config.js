var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var map = require('./map')
var ROOT = path.resolve(__dirname)

var entry = {
		'vendor': ['jquery']
	},
	plugins = []

for (chunk in map) {
	entry[chunk] = map[chunk].src
	plugins.push(new HtmlWebpackPlugin({
		filename: ROOT + '/pages/views/' + map[chunk].tpl + '.html',
		template: './pages/tpl/' + map[chunk].tpl + '.tpl.html',
		chunks: ['vendor', chunk]
	}))
}

module.exports = {
	entry: entry,
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/dist'
	},
	resolve: {
		alias: {
			'src': path.resolve(__dirname,'src'),
			'common': 'src/common',
			'tpl': path.resolve(__dirname,'pages/tpl')
		}
	},
	module: {
		loaders: [
			{
				test: /\.css/,
				loader: ExtractTextPlugin.extract('style', 'css')
			},
			{
				test: /\.js$/,
				loader: "babel",
				exclude: /node_modules/
			},
			{
				test: /\.html$/,
      			loader: "raw-loader"
			}
		]
	},
	plugins: plugins.concat([
		new webpack.DefinePlugin({
			'ENV': JSON.stringify(process.env.ENV)
		}),
		new webpack.optimize.CommonsChunkPlugin('vendor','vendor.js'),
		new ExtractTextPlugin('[name].css'),
		new webpack.ProvidePlugin({
			$: 'jquery'
		})
	])
}