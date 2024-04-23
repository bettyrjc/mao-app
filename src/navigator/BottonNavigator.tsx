import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import DashboardScreen from '../screens/DashboardScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import UserScreen from '../screens/UserScreen';
import Navbar from '../utils/navbars/Header';
import ExpensesScreen from '../screens/ExpensesScreen';
import { StyleSheet, View } from 'react-native';
import { COLORS } from '../constants';

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
        name="Add"
        component={ExpensesScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: () => (
            <View style={styles.tabBarButton}>
              <View style={styles.iconCircle}>
                <Icon name="add-outline" style={[styles.icon, { color: COLORS.white }]} size={30} />
              </View>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={UserScreen}
        options={{
          tabBarLabel: 'Cuenta',
          tabBarIcon: ({ color, size }: any) => <Icon name="person-outline" size={size} color={color} />,
          tabBarActiveTintColor: '#FF792E',
        }}
      />
    </Tab.Navigator>
  );
};

export default BottonNavigator;

const styles = StyleSheet.create({
  tabBarButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.secondaryDark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 30, // Tamaño del icono dentro del círculo
  },
});
