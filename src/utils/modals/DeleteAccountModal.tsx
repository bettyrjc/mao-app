import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import ContainedButton from '../buttons/ContainedButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ModalView from './ModalView';
import {COLORS, GRAY_COLORS} from '../../constants';
import * as Yup from 'yup';
import {Controller, useForm} from 'react-hook-form';
import {validator} from '../forms/validator';
import InputText from '../inputs/InputText';

type DeleteAccountModalType = {
  open: boolean;
  handleOpenModal: () => void;
  title?: string;
  onSubmit: (data: any) => void;
  isLoading: boolean;
};
const schema = Yup.object().shape({
  mica: Yup.string()
    .matches(/^(ACEPTO|acepto)$/i, 'El valor debe ser "ACEPTO"')
    .required('Este campo es obligatorio'),
});
const DeleteAccountModal = ({
  open,
  handleOpenModal,
  onSubmit,
  isLoading,
}: DeleteAccountModalType) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: data => validator(data, schema),
  });
  return (
    <ModalView modalVisible={open} handleModal={handleOpenModal}>
      <KeyboardAwareScrollView
        resetScrollToCoords={{x: 0, y: 0}}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}>
        <View style={styles.imgContainer}>
          <Image source={require('../../assets/man-on-phone.png')} />
        </View>
        <Text style={styles.title}>
          Esta acción es irreversible. Ingresa{' '}
          <Text style={styles.highlightText}>ACEPTO</Text>, a continuación para
          confirmar que deseas eliminar de forma permanente.
        </Text>

        <Controller
          control={control}
          name="mica"
          render={({field: {onChange, value}}) => (
            <InputText
              value={value}
              onChangeText={text => onChange(text)}
              error={errors.mica?.message}
              placeholder="ACEPTO"
              label=""
            />
          )}
        />
        <View style={styles.separator} />
        <View style={styles.containerButton}>
          <ContainedButton
            title="Cancelar"
            onPress={handleOpenModal}
            fontSize={16}
            isFulled={false}
            backgroundColor={COLORS.primaryGreen}
            textColor={COLORS.white}
            width={120}
          />
          <ContainedButton
            title="Eliminar"
            onPress={handleSubmit(onSubmit)}
            fontSize={16}
            isFulled={false}
            isLoading={isLoading}
            width={120}
            backgroundColor={COLORS.danger}
            textColor={COLORS.white}
          />
        </View>
      </KeyboardAwareScrollView>
    </ModalView>
  );
};

export default DeleteAccountModal;

const styles = StyleSheet.create({
  title: {
    marginTop: 10,
    marginBottom: 25,
    fontSize: 15,
    color: GRAY_COLORS.gray900,
    lineHeight: 24,
  },
  separator: {
    marginTop: 15,
  },
  imgContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  highlightText: {
    color: COLORS.primaryPurple,
    fontSize: 18,
    fontWeight: 'bold',
  },
  containerBotton: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 20,
  },
  containerButton: {
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
