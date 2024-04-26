import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { AuthContext } from '../context/AuthContext';
import BottonNavigator from './BottonNavigator';
import LoadingScreen from '../screens/LoadingScreen';

const Stack = createStackNavigator();

const Navigator = () => {
  const { status, isLoadingUser } = useContext(AuthContext);
  if (status === 'checking') {
    return <LoadingScreen />;
  }
  if (status === 'authenticated' && !isLoadingUser) {
    return <BottonNavigator />;
  }
  console.log(status)

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default Navigator;
