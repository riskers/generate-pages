if(ENV == 'DEV') {
	require('pages/html/page3.html')
}

/* 
	使用 ProvidePlugin 就不用 
	import $ from 'jquery'
*/
$('body').append('<h1>this is page3</h1>')