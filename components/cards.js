import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet } from 'react-native';

export default class Cards extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={styles.card}>
				<View >
					<Text style={styles.cardHeader}>{this.props.data.state}</Text>
					<Text style={styles.cardSubHeader}>{this.props.data.lastupdatedtime}</Text>
				</View>

				<View style={styles.cardBody}>
					<View style={styles.dataContainer}>
						<Text style={{ color: 'red' }}> CONFIRMED</Text>
						<Text style={{ color: 'red' }}> {this.props.data.confirmed}</Text>
						<Text style={{ color: 'red' }}> {this.props.data.deltaconfirmed !== '0' ? '[ +' + this.props.data.deltaconfirmed + ' ]' : ''} </Text>
					</View>

					<View style={styles.dataContainer}>
						<Text style={{ color: '#007bff' }}> ACTIVE</Text>
						<Text style={{ color: '#007bff' }}> {this.props.data.active}</Text>
					</View>

					<View style={styles.dataContainer}>
						<Text style={{ color: '#28a745' }}> RECOVERED</Text>
						<Text style={{ color: '#28a745' }}> {this.props.data.recovered}</Text>
						<Text style={{ color: '#28a745' }}>{this.props.data.deltarecovered !== '0' ? '[ +' + this.props.data.deltarecovered + ' ]' : ''}</Text>
					</View>

					<View style={styles.dataContainer}>
						<Text > DEATH</Text>
						<Text > {this.props.data.deaths}</Text>
						<Text style={{ color: 'red' }}> {this.props.data.deltadeaths !== '0' ? '[ +' + this.props.data.deltadeaths + ' ]' : ''}</Text>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	card: {
		marginHorizontal: 10,
		marginTop: 20,
		borderRadius: 5,
		shadowOpacity: 1,
		shadowRadius: 5,
		elevation: 10,
		shadowColor: '#dcdada',
		paddingHorizontal: 10,
		paddingVertical: 10,
		backgroundColor: '#fff'
	},
	cardHeader: {
		fontSize: 20,
		fontWeight: "normal",
	},
	cardSubHeader: {
		fontSize: 12,
		color: '#777777',
		fontWeight: "normal",
	},
	cardBody: {
		paddingVertical: 10,
		flexDirection: 'row',
		alignItems: 'stretch'
	},
	dataContainer: {
		width: '25%',
		alignItems: 'center'
	}
});