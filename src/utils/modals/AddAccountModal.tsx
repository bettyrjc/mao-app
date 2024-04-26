import React from 'react';
import ModalView from './ModalView';
import { StyleSheet, Text } from 'react-native';
import AddAccountForm from '../forms/AddAccountForm';

type AddAccountModalProps = {
  openAddBank: boolean;
  handleModalOpenAddBank: () => void;
  title?: string;
  onSubmitData: (dataBank: any) => void;
  names: string;
  isLoading: boolean;
  defaultValues?: any;
};
const AddAccountModal = ({
  openAddBank,
  handleModalOpenAddBank,
  onSubmitData,
  title = 'Agregar cuenta bancaria',
}: AddAccountModalProps) => {
  return (
    <ModalView modalVisible={openAddBank} handleModal={handleModalOpenAddBank}>
      <Text style={styles.title}>{title}</Text>
      <AddAccountForm onSubmit={onSubmitData} isLoading={false} />
    </ModalView>
  );
};

export default AddAccountModal;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
