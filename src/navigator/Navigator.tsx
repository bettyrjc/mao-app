import React, { useContext, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { AuthContext } from '../context/AuthContext';
import ProtectedNavigator from './ProtectedNavigator';
import LoadingScreen from '../screens/LoadingScreen';

const Stack = createStackNavigator();

const Navigator = () => {
  const { status } = useContext(AuthContext);
  console.log('status', status);
  if (status === 'checking') {
    return <LoadingScreen />;
  }
  if (status === 'authenticated') {
    return <ProtectedNavigator />;
  }

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
