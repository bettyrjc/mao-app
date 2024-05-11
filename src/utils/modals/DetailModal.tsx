/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import ModalView from './ModalView';
import { StyleSheet, Text, View } from 'react-native';
import { GRAY_COLORS } from '../../constants';

type DetailModalProps = {
  open: boolean;
  handleModal: () => void;
  title?: string;
  isLoading: boolean;
  movement: any;
};
const DetailModal = ({ open, handleModal, title = 'Detalle de movimiento', isLoading, movement }: DetailModalProps) => {
  return (
    <ModalView modalVisible={open} handleModal={handleModal}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.container}>
        {isLoading ? (
          <Text>Cargando...</Text>
        ) : (
          <View>
            <View style={styles.textContainer}>
              <Text style={styles.textTitle}>Monto: </Text>
              <Text style={styles.text}>{movement?.amount}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.textTitle}>Tipo de movimiento: </Text>
              <Text style={styles.text}>{movement?.type}</Text>
            </View>
            <Text
              style={styles.descriptionTitle}
            >
              Descripción
            </Text>
            <View style={styles.description}>
              <Text>{movement?.description || 'No tiene descripcion'} </Text>
            </View>
          </View>
        )}
      </View>
    </ModalView>
  );
};

export default DetailModal;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  container: {
    height: 300,
  },
  description: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    borderColor: GRAY_COLORS.gray400,
  },
  textTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  descriptionTitle: {
    marginTop: 20,
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
  },
});
