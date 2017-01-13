var path = require('path')
var ROOT = path.resolve(__dirname)

module.exports = {
	'page1/main': {
		"src": ROOT + "/src/page1/main",
		"tpl": "page1"
	},
	'page2/main': {
		"src": ROOT + '/src/page2/main',
		"tpl": "page2"
	}
}