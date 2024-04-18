import React, { useContext } from 'react';
import { Alert, StyleSheet } from 'react-native';
import uuid from 'react-native-uuid';
import { AuthContext } from '../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import DashboardTemplate from '../templates/DashboardTemplate';
import { useAccounts, useCreateAccount } from '../hooks/useAccount';

const DashboardScreen = () => {
  const { logOut } = useContext(AuthContext);
  const { mutate: saveAccount, isLoading: isLoadingAddAccount } = useCreateAccount();
  const { data: dataAccount } = useAccounts();

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
      <DashboardTemplate
        onLogout={onSubmit}
        onNewAccount={onNewAccount}
        isLoadingAddAccount={isLoadingAddAccount}
        dataAccount={dataAccount}
      />
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
