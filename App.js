import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import HomeScreen from './screens/HomeScreen';
import NewsScreen from './screens/NewsScreen';
import ChartScreen from './screens/ChartScreen';
import DistrictScreen from './screens/DistrictScreen';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

const HomeStackScreen = () => {
	return (
		<HomeStack.Navigator>
			<HomeStack.Screen name="Home" component={HomeScreen} />
			<HomeStack.Screen name="District" component={DistrictScreen} />
		</HomeStack.Navigator>
	);
}

const ChartStack = createStackNavigator();

const ChartStackScreen = () => {
	return (
		<ChartStack.Navigator>
			<ChartStack.Screen name="Statistics" component={ChartScreen} />
		</ChartStack.Navigator>
	);
}

const NewsStack = createStackNavigator();

const NewsStackScreen = () => {
	return (
		<NewsStack.Navigator>
			<NewsStack.Screen name="News" component={NewsScreen} />
		</NewsStack.Navigator>
	);
}

const App = () => {
	return (
		<NavigationContainer>
			<Tab.Navigator
				tabBarOptions={{
					activeTintColor: '#3f51b5',
					inactiveTintColor: 'gray',
					style: {
						backgroundColor: '#fff',
						paddingBottom: 15
					},
					labelStyle: {
						fontSize: 14,
					},
				}}>
				<Tab.Screen name="Home" component={HomeStackScreen} />
				<Tab.Screen name="Statistics" component={ChartStackScreen} />
				<Tab.Screen name="News" component={NewsStackScreen} />
			</Tab.Navigator>
		</NavigationContainer>
	);
};

const styles = StyleSheet.create({
	tab: {
		backgroundColor: 'red'
	}
})

export default App;
