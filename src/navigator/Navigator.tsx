import React from 'react';
// import DrawerNavigator from './DrawerNavigator';
// import {AuthContext} from '../context/AuthContext';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
// import RegisterScreen from '../screens/RegisterScreen';
// import LoadingScreen from '../screens/LoadingScreen';
const Stack = createStackNavigator();

const Navigator = () => {
  // const {status} = useContext(AuthContext);

  // if (status === 'checking') {
  //   return <LoadingScreen />;
  // }
  // if (status === 'authenticated') {
  //   return <DrawerNavigator />;
  // }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default Navigator;
