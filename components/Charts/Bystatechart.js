import moment from 'moment';
import React, { Component } from 'react';
import { Text, View, FlatList, Dimensions } from 'react-native';
import { BarChart } from "react-native-chart-kit";
const Bystatechart = (props) => {
	let stateData = props.data.state_wise;
	let selectedState = props.data.selectedState

	const states = [];
	const stateWithCode = [];
	const status = [];
	const temp = {};
	if (!stateData || stateData.length === 0) {
		return <View></View>;
	}

	let selectedStateData = stateData.filter((ele) => {
		return ele.statecode === selectedState;
	});

	selectedStateData.forEach((ele, index) => {
		if (index == 0) {
			status.push(ele.confirmed, ele.recovered, ele.active, ele.deaths);
		}
	});

	return (
		<View >
			<BarChart
				data={{
					labels: ['Confirmed', 'Recovered', 'Active', 'Death'],
					datasets: [
						{
							data: status,
						},
					]
				}}
				width={Dimensions.get('window').width - 16}
				height={250}
				chartConfig={{
					strokeWidth: 2,
					backgroundColor: '#fff',
					backgroundGradientFrom: '#fff',
					backgroundGradientTo: '#fff',
					decimalPlaces: '0',
					color: (opacity = 1) => `rgba(255, 7, 58, ${opacity})`,
					labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
					style: {
						borderRadius: 16,
					},
					fromZero: true
				}}
				style={{
					marginVertical: 8,
					borderRadius: 16,
				}}
			/>
		</View>
	);
}


export default Bystatechart;