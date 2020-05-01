import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';

import AllState from '../components/Charts/allstates'

export default class WorldScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			timeseries: [],
			isLoading: true
		};
	}

	componentDidMount() {
		this.getIndiaData();
	}

	getIndiaData() {
		fetch('https://api.covid19india.org/data.json')
			.then((response) => response.json())
			.then((json) => {
				this.setState({ timeseries: json.cases_time_series });
				this.timeseries = json.cases_time_series;
			})
			.catch((error) => console.error(error))
			.finally(() => {
				this.setState({ isLoading: false });
			});
	}


	render() {
		return (

			<View style={{ marginHorizontal: 10 }}>

			</View >

		);
	}
};