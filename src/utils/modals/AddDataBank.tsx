import React from 'react';
import ModalView from './ModalView';
import BankDataForm from '../forms/BankDataForm';

type AddDataBankProps = {
  openAddBank: boolean;
  handleModalOpenAddBank: () => void;
  title?: string;
  onSubmitDataBank: (dataBank: any) => void;
  names: string;
  isLoading: boolean;
  defaultValues?: any;
};
const AddDataBank = ({
  openAddBank,
  handleModalOpenAddBank,
  title,
  onSubmitDataBank,
  names,
  isLoading,
  defaultValues,
}: AddDataBankProps) => {
  return (
    <ModalView modalVisible={openAddBank} handleModal={handleModalOpenAddBank}>
      <BankDataForm
        handleModalOpenAddBank={handleModalOpenAddBank}
        title={title}
        onSubmitDataBank={onSubmitDataBank}
        names={names}
        isLoading={isLoading}
        defaultValues={defaultValues}
      />
    </ModalView>
  );
};

export default AddDataBank;
