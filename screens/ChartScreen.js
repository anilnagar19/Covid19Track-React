import axios from 'axios';
import React, { Component } from 'react';
import { Text, View, RefreshControl, SafeAreaView, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-community/picker';

import AllState from '../components/Charts/allstates';
import Agechart from '../components/Charts/Agechart';
import Genderchart from '../components/Charts/Genderchart';
import Bystatechart from '../components/Charts/Bystatechart';

export default class ChartScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			timeseries: [],
			row_data: [],
			isLoading: true,
			state_wise: [],
			selectedState: 'TT'
		};
	}

	componentDidMount() {
		this.getStates();
	}

	getStates = async () => {
		try {
			const [
				timeseries,
				raw_data,
			] = await Promise.all([
				axios.get('https://api.covid19india.org/data.json'),
				axios.get('https://api.covid19india.org/raw_data.json'),
				axios.get('https://api.covid19india.org/states_daily.json'),
			]);
			this.setState({
				timeseries: timeseries.data.cases_time_series,
				raw_data: raw_data.data.raw_data,
				state_wise: timeseries.data.statewise,
				isLoading: false
			});
			this.stateWiseData = this.state.state_wise;
		} catch (err) {
			console.log(err);
		}
	};

	render() {
		const { isLoading } = this.state;

		if (this.state.state_wise) {
			this.stateData = this.state.state_wise.map((s, i) => {
				return <Picker.Item key={i} value={s.statecode} label={s.state} />
			});
		}

		return (
			<SafeAreaView >
				<ScrollView contentContainerStyle={styles.scrollView}
					refreshControl={
						<RefreshControl refreshing={this.state.isLoading} onRefresh={this.getStates} />
					}>
					{isLoading ? <ActivityIndicator /> : (
						<View style={{ marginHorizontal: 10 }} >
							<View style={styles.chartContainer}>
								<Text style={styles.chartHeader}>India Total Cases</Text>
								<AllState title="India - Total Cases"
									timeseries={this.state.timeseries}>
								</AllState>
							</View>
							<View style={styles.chartContainer}>

								<Text style={styles.chartHeader}>By state</Text>
								<Picker
									selectedValue={this.state.selectedState}
									style={{ width: '100%', backgroundColor: 'red', color: '#fff', paddingHorizontal: 10 }}
									onValueChange={(itemValue, itemIndex) =>
										this.setState({ selectedState: itemValue })
									}>
									{this.stateData}
								</Picker>
								<Bystatechart
									data={this.state}>
								</Bystatechart>
							</View>
							<View style={styles.chartContainer}>
								<Text style={styles.chartHeader}>Patient's By Age</Text>
								<Agechart
									raw_data={this.state.raw_data}>
								</Agechart>
							</View>
							<View style={styles.chartContainer}>
								<Text style={styles.chartHeader}>Patient's By Gender</Text>
								<Genderchart
									data={this.state.raw_data}>
								</Genderchart>
							</View>
						</View >
					)}
				</ScrollView>
			</SafeAreaView>
		);
	}
};

const styles = StyleSheet.create({
	chartContainer: {
		backgroundColor: '#fff',
		marginTop: 10,
		borderRadius: 10
	},
	chartHeader: {
		fontSize: 25,
		padding: 10,
		textAlign: 'center'
	}
})