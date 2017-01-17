var path = require('path')
var ROOT = path.resolve(__dirname)

module.exports = {
	'page1/main': {
		"src": ROOT + "/src/page1/main",
		"tpl": "page1.html"
	},
	'page2/main': {
		"src": ROOT + '/src/page2/main',
		"tpl": "page2.html"
	},
	'page3/main': {
		"src": ROOT + '/src/page3/main',
		"tpl": "page3.html"
	},
	'page4/main': {
		"src": ROOT + '/src/page4/main',
		"tpl": "page4.php"
	}
}