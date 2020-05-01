import axios from 'axios';
import React, { Component } from 'react';
import { Text, View, FlatList, SafeAreaView, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import TimelineCom from '../components/timeline';

export default class ChartScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			log: [],
			isLoading: true
		};
	}

	componentDidMount() {
		this.getNewsData();
	}

	getNewsData = async () => {
		try {
			const [
				logData
			] = await Promise.all([
				axios.get('https://api.covid19india.org/updatelog/log.json'),
			]);

			this.setState({
				log: logData.data,
				isLoading: false
			});
		} catch (err) {
			console.log(err);
		}
	};

	onRefresh = () => {
		this.getNewsData();
	}

	render() {
		return (
			<SafeAreaView style={styles.container}>
				<ScrollView
					contentContainerStyle={styles.scrollView}
					refreshControl={
						<RefreshControl refreshing={this.state.isLoading} onRefresh={this.onRefresh} />
					}>
					<TimelineCom style={styles.timeLineConteiner}
						data={this.state.log}
					/>
				</ScrollView>
			</SafeAreaView>

		)
	}
}

const styles = StyleSheet.create({
	timeLineConteiner: {
		backgroundColor: '#fff',
	}
});