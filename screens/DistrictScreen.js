import React, { Component } from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import Search from '../components/search';

export default class DistrictScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			districtData: [],
		};
	}

	componentDidMount() {
		this.districtData = [];

		if (this.props.route.params) {
			let districtTempData = this.props.route.params.districtData;

			Object.keys(districtTempData).map((key, value) => {
				districtTempData[key].city = key;

				this.districtData.push(districtTempData[key]);

				this.districtData.sort((a, b) => {
					return b.confirmed - a.confirmed;
				});

				this.setState({ data: this.districtData });
			});
		}

	}

	SearchedData = (searchInput) => {
		const newData = this.districtData.filter((item) => {
			return (item.city.toLowerCase().indexOf(searchInput.toLowerCase()) > -1);
		});

		this.setState({ data: newData });
	}

	render() {
		const { data, isLoading } = this.state;

		return (

			<View style={styles.container}>
				<Search handleChange={this.SearchedData} style={styles.search}></Search>

				<View style={styles.header}>
					<View style={styles.cell}>
						<Text style={{ fontSize: 15, fontWeight: 'bold' }}>District</Text>
					</View>
					<View style={styles.cell}>
						<Text style={{ fontSize: 15, fontWeight: 'bold' }}>Confirmed</Text>
					</View>
				</View>
				{isLoading ? <ActivityIndicator /> : (
					<FlatList
						data={data}
						keyExtractor={(item, index) => index.toString()}
						renderItem={({ item, index }) => (
							<View style={[styles.row, { backgroundColor: index % 2 == 0 ? "#red" : "#FFFFFF" }]} >
								<View style={styles.cell}>
									<Text>{item.city}</Text>
								</View>
								<View style={styles.cell}>
									<Text>{item.confirmed}</Text>
									<Text style={{ color: 'red' }}> {item.delta.confirmed !== 0 ? '[ +' + item.delta.confirmed + ' ]' : ''}</Text>
								</View>
							</View>
						)
						}
					/>
				)}
			</View >
		);
	}
};

const styles = StyleSheet.create({
	container: {
		padding: 10
	},
	header: {
		alignItems: 'stretch',
		flexDirection: 'row',
		backgroundColor: 'grey',
		paddingHorizontal: 10,
		marginTop: 10,
		borderRadius: 10
	},
	row: {
		alignItems: 'stretch',
		flexDirection: 'row',
		paddingHorizontal: 10
	},
	cell: {
		width: '50%',
		paddingVertical: 10,
		flexDirection: 'row',
	},
	textCenter: {
		textAlign: 'center'
	},
	search: {
		color: 'grey',
		borderColor: 'grey',
	}
})