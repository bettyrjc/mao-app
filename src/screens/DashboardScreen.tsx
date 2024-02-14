import { View, Text } from 'react-native';
import React from 'react';
import { useUserContext } from '../context/UserContext';

const DashboardScreen = () => {
  const { user } = useUserContext();
  console.log('data fff', user);
  return (
    <View>
      <Text>{user?.name}</Text>
    </View>
  );
};

export default DashboardScreen;
