import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import DashboardScreen from '../screens/DashboardScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import UserScreen from '../screens/UserScreen';
import Navbar from '../utils/navbars/Header';

const Tab = createBottomTabNavigator();

const BottonNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        header(props) {
          return <Navbar title={props?.route?.name} />;
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color, size }: any) => <Icon name="home-outline" size={size} color={color} />,
          tabBarActiveTintColor: '#FF792E',
        }}
      />
      <Tab.Screen
        name="User"
        component={UserScreen}
        options={{
          tabBarLabel: 'Usuario',
          tabBarIcon: ({ color, size }: any) => <Icon name="person-outline" size={size} color={color} />,
          tabBarActiveTintColor: '#FF792E',
        }}
      />
    </Tab.Navigator>
  );
};

export default BottonNavigator;
