/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
var REQUEST_URL = 'http://wp-kyoto.net/wp-json/';
import React, {
	AppRegistry,
	Component,
	StyleSheet,
	Text,
	View
} from 'react-native';

class reactWpApp extends Component {
	constructor(props) {
			super(props);
			this.state = {
				site: [],
			};
		}
	fetchData() {
			fetch(REQUEST_URL)
				.then((response) => response.json())
				.then((responseData) => {
					this.setState({
						site: responseData,
					});
				})
				.done();
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
	componentDidMount() {
		this.fetchData();
	}
	render() {
		var site = this.state.site
		if (!site) {
				return this.renderLoadingView();
			}

		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>
					{site.name}
				</Text>
				<Text style={styles.instructions}>
					{site.description}
				</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
});

AppRegistry.registerComponent('reactWpApp', () => reactWpApp);
