import { Text, Pressable, StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import { useUserContext } from '../context/UserContext';
import { AuthContext } from '../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../constants';

const DashboardScreen = () => {
  // const { data } = useUser();
  const { logOut } = useContext(AuthContext);

  const onSubmit = () => {
    logOut();
  };
  const { user } = useUserContext();
  console.log('data fff', user);
  return (
    <SafeAreaView style={styles.box}>
      <Text>
        {user?.name} {user?.last_name}
      </Text>
      <Text>{user?.email}</Text>
      <Pressable onPress={onSubmit}>
        <Text>Logout</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  box: {
    flex: 1,
    paddingHorizontal: 4,
  },
});

export default DashboardScreen;
