import React from 'react';
import {Text, Image, View, StyleSheet} from 'react-native';
import {COLORS, GRAY_COLORS} from '../../constants';
import ContainedButton from '../buttons/ContainedButton';
import ModalView from './ModalView';

type AddDataBankProps = {
  open: boolean;
  handleOpenModal: () => void;
  onSubmit: () => void;
  isLoading: boolean;
};

const EmailReceivedModal = ({
  open,
  handleOpenModal,
  onSubmit,
  isLoading,
}: AddDataBankProps) => {
  return (
    <ModalView modalVisible={open} handleModal={handleOpenModal}>
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/mail.png')} />
      </View>
      <Text style={styles.title}>¡Gracias!</Text>
      <Text style={styles.description}>
        Si hay una cuenta asociada con este email, te mandaremos las
        instrucciones inmediatamente
      </Text>

      <View style={styles.separator} />
      <ContainedButton
        onPress={onSubmit}
        title="Reenviar correo"
        backgroundColor={COLORS.primaryGreen}
        isFulled
        isLoading={isLoading}
      />
    </ModalView>
  );
};

export default EmailReceivedModal;
const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    color: GRAY_COLORS.gray900,
    textAlign: 'center',
    marginTop: 10,
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
  },
  description: {
    marginBottom: 25,
    fontSize: 16,
    color: GRAY_COLORS.gray900,
    lineHeight: 24,
  },
  separator: {
    marginTop: 15,
  },
});
