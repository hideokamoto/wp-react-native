'use strict';
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
var REQUEST_URL = 'http://wp-kyoto.net/wp-json/wp/v2/media/?per_page=30';

var MediaRow = React.createClass({
	render: function() {
		return (
			<NavigatorIOS
				style={styles.navigator}
				initialRoute={{
					component: MediaList,
					title: 'Media',
			}}/>
		);
	}
})


var MediaList = React.createClass({
	getInitialState: function() {
		return {
			items: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1 !== row2,
			}),
			loaded: false,
		};
	},

	componentDidMount: function() {
		this.fetchData();
	},

	render: function() {
		if ( !this.state.loaded ) {
			return this.renderLoadingView();
		}

		return (
			<ListView
				dataSource={this.state.items}
				renderRow={this.renderItem}
				style={styles.listView}/>
		);
	},

	renderLoadingView: function() {
		return (
			<View style={styles.container}>
				<Text>
					Loading posts...
				</Text>
			</View>
		);
	},

	renderItem: function( item, sectionID, rowID ) {
		return (
			<TouchableWithoutFeedback	onPress={ () => this.onPressed( item ) }>
				<View style={styles.container}>
					<Image
						source={{uri: item.source_url}}
						style={styles.thumbnail}/>
				</View>
			</TouchableWithoutFeedback>
		);
	},

	fetchData: function() {
		fetch( REQUEST_URL )
			.then( ( response ) => response.json())
			.then( ( responseData ) => {
				this.setState({
					items: this.state.items.cloneWithRows( responseData ),
					loaded: true,
				});
			})
			.done();
	},

	onPressed: function( item ) {
		this.props.navigator.push({
			title: item.title.rendered,
			component: MediaView,
			passProps: { item: item }
		})
	},
});

var MediaView = React.createClass({
	render: function() {
		return (
			<View style={styles.imageContainer}>
				<Image
					source={{uri: this.props.item.source_url}}
					style={styles.imageView}/>
			</View>
		)
	}
});

var styles = StyleSheet.create({
	navigator: {
		flex: 1
	},
	container: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		backgroundColor: '#FFFFFF',
	},
	imageContainer: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		backgroundColor: '#FFFFFF',
	},
	name: {
		fontSize: 12,
		margin: 8,
		textAlign: 'left',
	},
	thumbnail: {
		flex: 1,
		width: 64,
		height: 128,
		margin: 2,
	},
	imageView: {
		flex: 1,
		justifyContent: 'center',
		width: 300,
		height: 300,
	},
	listView: {
		backgroundColor: '#FFFFFF',
	},
});

module.exports = MediaRow;
