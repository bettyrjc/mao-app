import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import uuid from 'react-native-uuid';
// import { useUserContext } from '../context/UserContext';
import { AuthContext } from '../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import DashboardTemplate from '../templates/DashboardTemplate';

const DashboardScreen = () => {
  // const { data } = useUser();
  const { logOut } = useContext(AuthContext);
  // const { user } = useUserContext();

  const onSubmit = () => {
    logOut();
  };

  const onNewAccount = (data: any) => {
    const object = {
      id: uuid.v4(),
      name: data.name,
      balance: data.balance,
      currency: data.currency,
    };
    console.log(object);
  };

  return (
    <SafeAreaView style={styles.box}>
      <DashboardTemplate onLogout={onSubmit} onNewAccount={onNewAccount} />
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
