import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardScreen from '../screens/DashboardScreen';

const Stack = createStackNavigator();
const ProtectedNavigator = () => {
  return (
    <Stack.Navigator
    // screenOptions={{
    //   headerShown: true,
    //   header(props) {
    //     return <Navbar title={props?.route.name} />;
    //   },
    // }}
    >
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
    </Stack.Navigator>
  );
};
export default ProtectedNavigator;
