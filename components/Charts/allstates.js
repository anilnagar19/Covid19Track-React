import moment from 'moment';
import React, { Component } from 'react';
import { Text, View, FlatList, Dimensions } from 'react-native';
import { LineChart } from "react-native-chart-kit";


const AllState = (props) => {
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
			if (index % 5 == 0) {
				dates.push(moment(data.date.trim(), 'DD MMM').format('MM/DD'));
			}

			confirmed.push(data.totalconfirmed);
			recovered.push(data.totalrecovered);
			deceased.push(data.totaldeceased);
		}
	});

	return (
		<View >
			<LineChart
				data={{
					labels: dates,
					datasets: [
						{ data: confirmed, color: (opacity = 1) => `rgba(255, 7, 58, ${opacity})` },
						{ data: recovered, color: (opacity = 1) => `rgba(40, 167, 70, ${opacity})`, },
						{ data: deceased, color: (opacity = 1) => `rgba(108, 117, 125, ${opacity})`, }
					],
					legend: ["Confirmed", "Recovered", "Deceased"] // optional
				}}

				width={Dimensions.get("window").width - 20} // from react-native
				height={250}
				yAxisInterval={5} // optional, defaults to 1
				xLabelsOffset={20}
				verticalLabelRotation={-90}
				chartConfig={{
					backgroundColor: "#fff",
					backgroundGradientFrom: "#fff",
					backgroundGradientTo: "#fff",
					fillShadowGradientOpacity: 0,
					strokeWidth: 2,
					decimalPlaces: 0,
					color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
					labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
					propsForDots: {
						r: "0",
					}
				}}
				bezier
				style={{
					marginVertical: 10,
					borderRadius: 10
				}}
			/>
		</View>
	);
}


export default AllState;