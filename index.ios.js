'use strict';
var SITE_URL = 'http://wp-kyoto.net/';
var API_URL = SITE_URL + 'wp-json/';
var Icon = require('react-native-vector-icons/FontAwesome');

var React = require('react-native');
var {
	AppRegistry,
	StyleSheet,
	TabBarIOS,
	View,
	Text,
} = React;
var PostRow = require('./app/post.ios.js');
var MediaRow = require('./app/media.ios.js');

var reactWpApp = React.createClass({

	statics: {
		title: '<TabBarIOS>',
		description: 'Tab-based navigation.',
	},

	displayName: 'TabBarExample',

	getInitialState: function() {
		return {
			selectedTab: 'postTab',
		};
	},
	_renderContent: function( type: string ) {
		if ( 'post' == type ) {
			var apiPath = API_URL + 'wp/v2/posts';
			return (
				<PostRow apiPath={apiPath}/>
			);
		} else if ( 'media' == type ) {
			var apiPath = API_URL + 'wp/v2/media';
			return (
				<MediaRow apiPath={apiPath}/>
			);
		}
		return (
			<View>
				<Text>No Data.</Text>
			</View>
		);
	},

	render: function() {
		return (
			<TabBarIOS
				tintColor="white"
				barTintColor="darkslateblue">
				<Icon.TabBarItem
					title="Post List"
					iconName='newspaper-o'
					selected={this.state.selectedTab === 'postTab'}
					onPress={() => {
						this.setState({
							selectedTab: 'postTab',
						});
					}}>
					{this._renderContent('post')}
				</Icon.TabBarItem>
				<Icon.TabBarItem
					title="Media"
					iconName='image'
					selected={this.state.selectedTab === 'mediaTab'}
					onPress={() => {
						this.setState({
							selectedTab: 'mediaTab',
						});
					}}>
					{this._renderContent('media')}
				</Icon.TabBarItem>
			</TabBarIOS>
		)
	}
})


var styles = StyleSheet.create({
	tabContent: {
		flex: 1,
		alignItems: 'center',
	},
	tabText: {
		color: 'white',
		margin: 50,
	},

});

AppRegistry.registerComponent( 'reactWpApp', () => reactWpApp );
