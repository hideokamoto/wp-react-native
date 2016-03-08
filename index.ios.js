/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
var REQUEST_URL = 'http://wp-kyoto.net/wp-json/wp/v2/posts/?_embed';
import React, {
	AppRegistry,
	Component,
	ListView,
	StyleSheet,
	Text,
	View,
} from 'react-native';

class reactWpApp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1 !== row2,
			}),
			loaded: false,
		};
	}

	componentDidMount() {
		this.fetchData();
	}

	fetchData() {
		fetch(REQUEST_URL)
			.then((response) => response.json())
			.then((responseData) => {
				console.log(responseData);
				this.setState({
					dataSource: this.state.dataSource.cloneWithRows(responseData),
					loaded: true,
				});
			})
			.done();
	}

	render() {
		if (!this.state.loaded) {
			return this.renderLoadingView();
		}
		return (
			<ListView
				dataSource={this.state.dataSource}
				renderRow={this.renderPost}
				style={styles.listView}
			/>
		);
	}

	renderLoadingView() {
		return (
			<View style={styles.container}>
				<Text>
					Loading posts...
				</Text>
			</View>
		);
	}

	renderPost(post) {
		var date = new Date(post.date_gmt).toLocaleDateString();
		var author = post['_embedded']['author'][0]['name'];
		return (
			<View style={styles.container}>
				<View style={styles.innerContainer}>
					<Text style={styles.title}>{post.title.rendered}</Text>
					<Text style={styles.postInfo}>{date}　{author}</Text>
				</View>
			 </View>
			);
		}
	}

	var styles = StyleSheet.create({
		container: {
			flex: 1,
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: '#F5FCFF',
			borderBottomWidth: 1,
			borderBottomColor: '#dedede'
		},
		innerContainer: {
			flex: 1,
			marginRight: 20,
			marginLeft: 20,
			marginTop: 20,
			marginBottom: 20,
		},
		title: {
			fontSize: 20,
			marginBottom: 8,
			textAlign: 'center',
		},
		postInfo: {
			fontSize: 10,
			textAlign: 'center',
		},
		listView: {
			paddingTop: 20,
			backgroundColor: '#F5FCFF',
		},
	});

AppRegistry.registerComponent('reactWpApp', () => reactWpApp);
