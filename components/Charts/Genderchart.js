import moment from 'moment';
import React, { Component } from 'react';
import { Text, View, FlatList, Dimensions } from 'react-native';
import { PieChart } from "react-native-chart-kit";

const Genderchart = (props) => {
	let male = 0;
	let female = 0;
	let data = props.data;
	if (!data || data.length === 0) {
		return <View></View>;
	}

	if (!data || data.length === 0) {
		return <div></div>;
	}

	data.forEach((patient) => {
		if (patient.gender === 'M') {
			male++;
		} else if (patient.gender === 'F') {
			female++;
		}
	});

	return (
		<View >
			<PieChart
				data={[
					{
						name: 'Male',
						population: male,
						color: 'rgba(131, 167, 234, 1)',
						legendFontColor: '#7F7F7F',
						legendFontSize: 15,
					},
					{
						name: 'Female',
						population: female,
						color: '#ea6e9a',
						legendFontColor: '#7F7F7F',
						legendFontSize: 15,
					}
				]}
				width={Dimensions.get('window').width - 16}
				height={220}
				chartConfig={{
					backgroundColor: '#1cc910',
					backgroundGradientFrom: '#eff3ff',
					backgroundGradientTo: '#efefef',
					decimalPlaces: 2,
					color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
					style: {
						borderRadius: 16,
					},
				}}
				style={{
					marginVertical: 8,
					borderRadius: 16,
				}}
				accessor="population"
				backgroundColor="transparent"
				paddingLeft="15"
				absolute //for the absolute number remove if you want percentage
			/>
		</View>
	);
}


export default Genderchart;