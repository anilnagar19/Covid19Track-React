import moment from 'moment';
import React, { Component } from 'react';
import { Text, View, FlatList, Dimensions } from 'react-native';
import { BarChart } from "react-native-chart-kit";


const Agechart = (props) => {
	const ages = Array(10).fill(0);
	let raw_data = props.raw_data;
	if (!raw_data || raw_data.length === 0) {
		return <View></View>;
	}

	props.raw_data.forEach((patient) => {
		if (patient.agebracket) {
			const age = parseInt(patient.agebracket);
			for (let i = 0; i < 10; i++) {
				if (age > i * 10 && age <= (i + 1) * 10) {
					ages[i]++;
				}
			}
		}
	});

	return (
		<View >
			<BarChart
				data={{
					labels: [
						'0-10',
						'11-20',
						'21-30',
						'31-40',
						'41-50',
						'51-60',
						'61-70',
						'71-80',
						'81-90',
						'91-100',
					],
					datasets: [
						{
							data: ages,
						},
					],
				}}
				width={Dimensions.get('window').width - 20}
				height={250}
				verticalLabelRotation={-90}
				xLabelsOffset={20}
				chartConfig={{
					fromZero: true,
					withInnerLines: false,
					backgroundColor: '#fff',
					backgroundGradientFrom: '#fff',
					decimalPlaces: '0',
					barPercentage: .8,
					backgroundGradientTo: '#fff',
					color: (opacity = 1) => `rgba(255, 7, 58, ${opacity})`,
					labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
					propsForDots: {
						r: "0",
					}
				}}
				style={{
					marginVertical: 8,
					borderRadius: 16,
				}}
			/>
		</View>
	);
}


export default Agechart;