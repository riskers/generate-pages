var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var map = require('./map')
var ROOT = path.resolve(__dirname)
var ENV = process.env.ENV

var entry = {
		'vendor': [
			'jquery'
		]
	},
	plugins = []

for (chunk in map) {
	entry[chunk] = map[chunk].src
	plugins.push(new HtmlWebpackPlugin({
		alwaysWriteToDisk: true,
		filename: ROOT + '/pages/views/' + map[chunk].tpl,
		template: './pages/tpl/' + map[chunk].tpl,
		chunks: ['vendor', chunk]
	}))
}

if(ENV == 'PRO') {
	plugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true}))	
}else {
	plugins.push(new HtmlWebpackHarddiskPlugin())
}

module.exports = {
	devtool: ENV=='PRO' ? 'source-map' : 'cheap-eval-source-map',
	entry: entry,
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/dist'
	},
	resolve: {
		alias: {
			'src': path.resolve(__dirname,'src'),
			'pages': path.resolve(__dirname,'pages')
		}
	},
	externals: {
		'd3': 'window.d3'
	},
	devServer: {
		proxy: {
			'/page4.html': {
				target: 'http://localhost:8000/page4.php'
			}
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