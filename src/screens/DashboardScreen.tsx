/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Alert, StyleSheet } from 'react-native';
import uuid from 'react-native-uuid';
import { SafeAreaView } from 'react-native-safe-area-context';
import DashboardTemplate from '../templates/DashboardTemplate';
import { useAccounts, useCreateAccount } from '../hooks/useAccount';
import { useMovement, useMovements } from '../hooks/useMovements';
import { useErrorsContext } from '../context/ErrorsContext';

const DashboardScreen = () => {
  const { setErrors } = useErrorsContext();
  const { mutate: saveAccount, isLoading: isLoadingAddAccount } = useCreateAccount();
  const { data: dataAccount } = useAccounts();
  const { data: movements, isLoading: isLoadingMovements } = useMovements();

  const [openAddBank, setOpenAddBank] = React.useState(false);
  const [openDetailModal, setOpenDetailModal] = React.useState(false);
  const [idDetail, setIdDetail] = React.useState('');

  const { data: movement, isLoading } = useMovement(idDetail);

  const handleOpenDetailModal = (id: string) => {
    setOpenDetailModal(true);
    setIdDetail(id);
  };

  const handleCloseDetailModal = () => {
    setOpenDetailModal(!openDetailModal);
    setIdDetail('');
  };

  const onNewAccount = (data: any) => {
    const id = uuid.v4();
    const params = {
      id,
      name: data?.name,
      balance: data?.balance,
      currency: data?.currency,
    };

    saveAccount(
      { account_id: id, params },
      {
        onSuccess: () => {
          Alert.alert('Success', 'account created successfully');
          setOpenAddBank(false);
        },
        onError: (error: any) => {
          console.error('____ERROR___', error.response.data);
          setErrors(error.response.data?.detail);
          Alert.alert('Error', 'Error al crear de datos bancarios');
        },
      }
    );
  };
  return (
    <SafeAreaView style={styles.box}>
      <DashboardTemplate
        onNewAccount={onNewAccount}
        isLoadingAddAccount={isLoadingAddAccount}
        isLoadingMovements={isLoadingMovements}
        dataAccount={dataAccount}
        dataMovements={movements?.data || []}
        openAddBank={openAddBank}
        setOpenAddBank={setOpenAddBank}
        handleOpenDetailModal={handleOpenDetailModal}
        handleCloseDetailModal={handleCloseDetailModal}
        movement={movement}
        openDetailModal={openDetailModal}
        isLoading={isLoading}
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
