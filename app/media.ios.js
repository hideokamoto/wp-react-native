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

var MediaRow = React.createClass({
	render: function() {
		return (
			<NavigatorIOS
				style={styles.navigator}
				initialRoute={{
					component: MediaList,
					title: 'React WordPress',
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
			component: MediaView,
			passProps: { item: item }
		})
	},
});

var MediaView = React.createClass({
	render: function() {
		return (
			<WebView
				source={{html: this.props.item.content.rendered}}
			/>
		)
	}
});

var styles = StyleSheet.create({
});

module.exports = MediaRow;
