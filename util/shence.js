(function(para) {
	var p = para.sdk_url, n = para.name, w = window, d = document, s = 'script', x = null, y = null;
	w['sensorsDataAnalytic201505'] = n;
	w[n] = w[n] || function(a) {
		return function() {
			(w[n]._q = w[n]._q || []).push([ a, arguments ]);
		};
	};
	// var ifs = [ 'track', 'quick', 'register', 'registerPage', 'registerOnce',
	// 		'clearAllRegister', 'trackSignup', 'trackAbtest', 'setProfile',
	// 		'setOnceProfile', 'appendProfile', 'incrementProfile',
	// 		'deleteProfile', 'unsetProfile', 'identify', 'login', 'logout' ];

	var ifs = ['track','quick','register','registerPage','registerOnce',
	'clearAllRegister','trackSignup', 'trackAbtest', 'setProfile',
	'setOnceProfile','appendProfile', 'incrementProfile',
	'deleteProfile', 'unsetProfile', 'identify','login','logout',
	'trackLink','clearAllRegister','getAppStatus'];
	for (var i = 0; i < ifs.length; i++) {
		w[n][ifs[i]] = w[n].call(null, ifs[i]);
	}
	if (!w[n]._t) {
		x = d.createElement(s), y = d.getElementsByTagName(s)[0];
		x.async = 1;
		x.src = p;
		y.parentNode.insertBefore(x, y);
		w[n].para = para;
	}
})({
	sdk_url : 'https://static.sensorsdata.cn/sdk/1.8.1.5/sensorsdata.min.js',
	name : 'sa',
	server_url : 'http://shenceapi.tiebaobei.com/sa?project=default'
	// server_url : 'https://shenceapi.tiebaobei.com/sa?project=${jishou.shencePath}',
	//max_referrer_string_length: 1000
});