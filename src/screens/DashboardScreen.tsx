import { View, Text } from 'react-native';
import React from 'react';
import { useUser } from '../hooks/useUser';

const DashboardScreen = () => {
  const { data } = useUser();
  console.log('data fff', data);
  return (
    <View>
      <Text>{data?.name}</Text>
    </View>
  );
};

export default DashboardScreen;
