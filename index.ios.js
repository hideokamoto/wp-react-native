'use strict';
var REQUEST_URL = 'http://wp-kyoto.net/wp-json/wp/v2/posts/?_embed';

var React = require('react-native');
var {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	ListView,
	Image,
	NavigatorIOS,
	TouchableWithoutFeedback,
	WebView
} = React;
var PostRow = require('./app/post.ios.js');

var reactWpApp = React.createClass({
	render: function() {
		return (
			<PostRow />
		)
	}
})



AppRegistry.registerComponent( 'reactWpApp', () => reactWpApp );
