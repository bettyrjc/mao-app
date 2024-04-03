import React, { useContext } from 'react';
import { Alert, StyleSheet } from 'react-native';
import uuid from 'react-native-uuid';
// import { useUserContext } from '../context/UserContext';
import { AuthContext } from '../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import DashboardTemplate from '../templates/DashboardTemplate';
import { useCreateAccount } from '../hooks/useAccount';

const DashboardScreen = () => {
  // const { data } = useUser();
  const { logOut } = useContext(AuthContext);
  // const { user } = useUserContext();
  const { mutate: saveAccount, isLoading: isLoadingAddAccount } = useCreateAccount();
  const onSubmit = () => {
    logOut();
  };

  const onNewAccount = (data: any) => {
    const id = uuid.v4();
    const params = {
      id,
      name: data.name,
      balance: data.balance,
      currency: data.currency,
    };

    saveAccount(
      { account_id: id, params },
      {
        onSuccess: () => {
          Alert.alert('Success', 'account created successfully');
        },
        onError: (error: any) => {
          console.log('____ERROR___', error.response.data);
          Alert.alert('Error', 'Error al crear de datos bancarios');
        },
      }
    );
  };

  return (
    <SafeAreaView style={styles.box}>
      <DashboardTemplate onLogout={onSubmit} onNewAccount={onNewAccount} isLoadingAddAccount={isLoadingAddAccount} />
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
