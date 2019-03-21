import React from 'react';

import {
	createStackNavigator,
	createBottomTabNavigator,
	createAppContainer
} from 'react-navigation';

import Icon from 'react-native-vector-icons/Ionicons';

// screens
import Home from './screens/Home';

import Contacts from './screens/Contacts';
import ContactDetail from './screens/ContactDetail';

import Settings from './screens/Settings';
import SettingsModal from './components/SettingsModal';

const ContactStack = createStackNavigator({
	Contacts: {
		screen: Contacts,
		navigationOptions: {
			title: 'Contacts'
		}
	},
	ContactDetail: {
		screen: ContactDetail
	}
});

const TabNavigator = createBottomTabNavigator({
	Home: {
		screen: Home,
		navigationOptions: {
			tabBarIcon: ({ tintColor }) => (<Icon name="ios-home" size={22} color={tintColor} />)
		}
	},
	Contacts: {
		screen: ContactStack,
		navigationOptions: {
			tabBarIcon: ({ tintColor }) => (<Icon name="ios-contacts" size={22} color={tintColor} />)
		}
	},
	Settings: {
		screen: Settings,
		navigationOptions: {
			tabBarIcon: ({ tintColor }) => (<Icon name="ios-settings" size={22} color={tintColor} />)
		}
	}
}, {
	tabBarOptions: {
		activeTintColor: 'red'
	},
	initialRouteName: 'Contacts'
});

const ModalStack = createStackNavigator({
	Tabs: {
		screen: TabNavigator
	},
	SettingsModal: {
		screen: SettingsModal
	}
},{
	mode: 'modal',
	headerMode: 'none'
});

export default createAppContainer(ModalStack);
