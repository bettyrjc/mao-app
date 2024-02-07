import React from 'react';
import ModalView from './ModalView';
import DepartmentForm from '../forms/DepartmentForm';

type AddDepartamentsModalType = {
  handleModalOpenAddBank?: () => void;
  onSubmitDeparment: (data: any) => void;
  title?: string;
  isLoading?: boolean;
  defaultValues?: any;
  open: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
};

const AddDepartamentsModal = ({
  open,
  handleOpenModal,
  onSubmitDeparment,
  title,
  isLoading,
  defaultValues,
  handleCloseModal,
}: AddDepartamentsModalType) => {
  return (
    <ModalView
      modalVisible={open}
      handleModal={handleOpenModal}
      handleCloseModal={handleCloseModal}>
      <DepartmentForm
        handleModalOpen={handleOpenModal}
        onSubmitDeparment={onSubmitDeparment}
        title={title}
        isLoading={isLoading}
        defaultValues={defaultValues}
      />
    </ModalView>
  );
};

export default AddDepartamentsModal;
