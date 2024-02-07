import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ModalView from './ModalView';
import {COLORS} from '../../constants';
import Icon from 'react-native-vector-icons/Ionicons';

type RedirectToFormModalType = {
  open: boolean;
  handleOpenModal: () => void;
};
const RedirectToFormModal = ({
  open,
  handleOpenModal,
}: RedirectToFormModalType) => {
  const shareLink = async () => {
    try {
      // const optionsUrl = {
      //   url: urlForm,
      // };
      // await Share.open(optionsUrl);
      // setSuccessData({
      //   title: 'Copiado exitosamente',
      //   description: 'Tu link es único y sabremos que es tu inquilino',
      // });
      // setOpenGuest(false);
      // setOpenSuccessModal(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ModalView modalVisible={open} handleModal={handleOpenModal}>
      <View style={modalStyles.containerImage}>
        <Image source={require('../../assets/papel-success.png')} />
      </View>
      <View style={modalStyles.containerText}>
        <Text style={modalStyles.textStyle}>
          ¿Deseas completar la información del propietario? O{' '}
          <Text onPress={() => shareLink()} style={modalStyles.textShareStyle}>
            copia el link y compártelo <Icon name="copy-outline" />{' '}
          </Text>
          <Text style={modalStyles.textStyle}>
            al inquilino para que llene sus datos.
          </Text>
        </Text>
      </View>
    </ModalView>
  );
};

export default RedirectToFormModal;
const modalStyles = StyleSheet.create({
  textStyle: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 1,
  },

  textShareStyle: {
    fontSize: 14,
    marginBottom: 1,
    lineHeight: 20,
    fontWeight: 'bold',
    color: COLORS.primaryPurple,
  },
  containerImage: {
    display: 'flex',
    flexDirection: 'row', // Alinea el texto e icono horizontalmente
    alignItems: 'center', // Centra verticalmente el texto e icono
    justifyContent: 'center', //
    marginBottom: 10,
  },
  containerText: {
    marginBottom: 30,
    marginTop: 14,
  },
});
