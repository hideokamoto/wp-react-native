'use strict';
var React = require('react-native');var {
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
var REQUEST_URL = 'http://wp-kyoto.net/wp-json/wp/v2/posts/?_embed';

var PostRow = React.createClass({
	render: function() {
		return (
			<NavigatorIOS
				style={styles.navigator}
				initialRoute={{
					component: PostList,
					title: 'React WordPress',
			}}/>
		);
	}
})


var PostList = React.createClass({
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
						source={{uri: 'http://placehold.it/150x150'}}
						style={styles.thumbnail}/>
					<View style={styles.rightContainer}>
						<Text style={styles.title}>{item.title.rendered}</Text>
					</View>
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
			component: PostView,
			passProps: { item: item }
		})
	},
});

var PostView = React.createClass({
	render: function() {
		return (
			<WebView
				source={{html: this.props.item.content.rendered}}
			/>
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
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#FFFFFF',
	},
	rightContainer: {
		flex: 1,
	},
	title: {
		fontSize: 15,
		margin: 8,
		textAlign: 'left',
	},
	name: {
		fontSize: 12,
		margin: 8,
		textAlign: 'left',
	},
	thumbnail: {
		width: 80,
		height: 80,
		margin: 2,
	},
	listView: {
		backgroundColor: '#FFFFFF',
	},
});

module.exports = PostRow;
