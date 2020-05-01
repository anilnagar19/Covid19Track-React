import moment from 'moment';
import { View, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import Timeline from 'react-native-timeline-flatlist';

const TimelineCom = (props) => {
	let data = props.data;

	const allNews = [];

	if (!data || data.length === 0) {
		return <View></View>;
	}

	data.forEach((news) => {
		allNews.push({
			time: moment.unix(news.timestamp).format("HH:mm"),
			title: moment.unix(news.timestamp).format("DD MMMM"),
			description: news.update
		})
	});

	return (
		<Timeline style={styles.timeLineConteiner}
			data={allNews}
			lineColor='rgb(45,156,219)'
			timeContainerStyle={{ minWidth: 52, marginTop: 0 }}
			innerCircle={'dot'}
			options={{
				style: {
					paddingTop: 5,
				}
			}}
		/>
	);
}

const styles = StyleSheet.create({
	timeLineConteiner: {
		backgroundColor: '#fff',
		padding: 10
	}
});
export default TimelineCom;