import React, { Component } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

export default class Search extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View>
				<TextInput placeholder="Search"
					placeholderTextColor={this.props.style.color}
					style={[this.props.style, styles.searchInput]}
					onChangeText={this.props.handleChange}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	searchInput: {
		height: 40,
		borderWidth: 1,
		borderRadius: 20,
		paddingHorizontal: 10,
	}
})
