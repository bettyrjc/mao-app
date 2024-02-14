import { View, Text, Pressable } from 'react-native';
import React, { useContext } from 'react';
import { useUserContext } from '../context/UserContext';
import { AuthContext } from '../context/AuthContext';

const DashboardScreen = () => {
  // const { data } = useUser();
  const { logOut } = useContext(AuthContext);

  const onSubmit = () => {
    logOut();
  };
  const { user } = useUserContext();
  console.log('data fff', user);
  return (
    <View>
      <Text>
        {user?.name} {user?.last_name}
      </Text>
      <Text>{user?.email}</Text>
      <Pressable onPress={onSubmit}>
        <Text>Logout</Text>
      </Pressable>
    </View>
  );
};

export default DashboardScreen;
