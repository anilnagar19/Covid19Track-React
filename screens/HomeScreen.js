import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Text, View, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, RefreshControl } from 'react-native';
import Cards from '../components/cards';
import Search from '../components/search';

export default class HomeScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: [],
			totalData: {},
			cityData: [],
			isLoading: true
		};
	}

	getIndiaData() {
		fetch('https://api.covid19india.org/data.json')
			.then((response) => response.json())
			.then((json) => {
				let totalCard = json.statewise[0];
				json.statewise.shift();
				this.stateData = json.statewise;
				this.setState({ data: json.statewise, totalData: totalCard });
			})
			.catch((error) => console.error(error))
			.finally(() => {
				this.setState({ isLoading: false });
			});
	}

	getDistrictData() {
		fetch('https://api.covid19india.org/state_district_wise.json')
			.then((response) => response.json())
			.then((json) => {
				this.setState({ cityData: json });
			})
			.catch((error) => console.error(error))
			.finally(() => {
				this.setState({ isLoading: false });
			});
	}

	componentDidMount() {
		this.getIndiaData();
		this.getDistrictData();
	}

	SearchedData = (searchInput) => {
		const newData = this.stateData.filter((item) => {
			return (item.state.toLowerCase().indexOf(searchInput.toLowerCase()) > -1);
		});

		this.setState({ data: newData });
	}

	onRefresh = () => {
		this.getIndiaData();
		this.getDistrictData();
	}

	render() {
		const { data, isLoading } = this.state;

		return (
			<SafeAreaView style={styles.container}>
				<View style={{ backgroundColor: '#3f51b5', paddingVertical: 20 }}>
					<View style={{ paddingHorizontal: 10 }}>
						<Search handleChange={this.SearchedData} style={styles.search}></Search>
					</View>

					<Cards data={this.state.totalData} >
					</Cards>
				</View>

				<ScrollView
					contentContainerStyle={styles.scrollView}
					refreshControl={
						<RefreshControl refreshing={this.state.isLoading} onRefresh={this.onRefresh} />
					}>
					<View >
						{isLoading ? <ActivityIndicator /> : (
							<FlatList
								style={styles.listStyle}
								data={data}
								keyExtractor={(item, index) => index.toString()}
								renderItem={({ item, index }) => (
									<TouchableOpacity onPress={() => this.props.navigation.navigate('District', this.state.cityData[item.state])}>
										<Cards data={item}>
										</Cards>
									</TouchableOpacity>
								)
								}
							/>
						)}
					</View >
				</ScrollView>
			</SafeAreaView>

		);
	}
};

const styles = StyleSheet.create({
	listStyle: {
		marginTop: 0,
		paddingBottom: 100
	},
	search: {
		color: '#fff',
		borderColor: '#fff',
	}
})