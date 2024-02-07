import React from 'react';
import ModalView from './ModalView';
import {Image, StyleSheet, Text} from 'react-native';
import {GRAY_COLORS} from '../../constants';
type SuccessModalType = {
  handleModalSuccess: () => void;
  modalVisible: boolean;
  title?: string;
  description?: string;
};
const SuccessModal = ({
  modalVisible,
  handleModalSuccess,
  title = 'Enviado exitosamente',
  description,
}: SuccessModalType) => {
  return (
    <ModalView modalVisible={modalVisible} handleModal={handleModalSuccess}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <Image
        source={require('../../assets/success.png')}
        style={styles.image}
      />
    </ModalView>
  );
};

const styles = StyleSheet.create({
  title: {
    color: GRAY_COLORS.gray900,
    fontSize: 24,
    fontWeight: '400',
    textAlign: 'center',
  },
  description: {
    color: GRAY_COLORS.gray500,
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 10,
  },
  image: {
    minWidth: 320, // Establece el ancho mínimo deseado para la imagen
    width: '100%', // Asegura que la imagen ocupe todo el ancho disponible
  },
});
export default SuccessModal;
