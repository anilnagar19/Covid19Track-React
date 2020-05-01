import moment from 'moment';
import React, { Component } from 'react';
import { Text, View, FlatList, Dimensions } from 'react-native';
import { StackedBarChart } from "react-native-chart-kit";


const Dailycases = (props) => {
	const dates = [];
	const confirmed = [];
	const recovered = [];
	const deceased = [];

	let timeseries = props.timeseries;
	if (!timeseries || timeseries.length === 0) {
		return <View></View>;
	}

	props.timeseries.forEach((data, index) => {
		//console.log(moment(data.date.trim(), 'DD MMM').format('MM/DD'))
		if (index >= 30) {
			if (index % 7 == 0) {
				dates.push(moment(data.date.trim(), 'DD MMM').format('MM/DD'));
			}

			confirmed.push(data.dailyconfirmed);
			recovered.push(data.dailyrecovered);
			deceased.push(data.dailydeceased);
		}
	});

	return (
		<View >
			<StackedBarChart
				data={{
					labels: dates,
					legend: ['recovered', 'deceased', 'confirmed'],
					data: [recovered, deceased, confirmed],
					barColors: ['#28a746', '#6c757d', '#ff073a'],
				}}
				width={Dimensions.get('window').width - 20}
				height={220}
				chartConfig={{
					backgroundColor: '#fff',
					backgroundGradientFrom: '#fff',
					backgroundGradientTo: '#fff',
					decimalPlaces: 0,
					color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
					style: {
						borderRadius: 10,
					},
				}}
				style={{
					marginVertical: 8,
				}}
			/>
		</View>
	);
}


export default Dailycases;