import React from 'react';
import ModalView from './ModalView';
import {Image, StyleSheet, Text, View} from 'react-native';
import InputText from '../inputs/InputText';
import * as Yup from 'yup';
import {validator} from '../forms/validator';
import {useForm, Controller} from 'react-hook-form';
import ContainedButton from '../buttons/ContainedButton';
import {COLORS, GRAY_COLORS} from '../../constants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

type AddDataBankProps = {
  open: boolean;
  handleOpenModal: () => void;
  title?: string;
  onSubmit: (data: any) => void;
  isLoading: boolean;
};
const schema = Yup.object().shape({
  email: Yup.string()
    .email('Ingresa un email válido')
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Ingresa un email válido',
    )
    .required('El email es obligatorio'),
});
const ForgetPasswordModal = ({
  open,
  handleOpenModal,
  onSubmit,
  isLoading,
}: AddDataBankProps) => {
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
        <Text style={styles.title}>¿Has olvidado la contraseña?</Text>
        <Image source={require('../../assets/boy_window.png')} />
        <Text style={styles.description}>
          No te preocupes. Te enviaremos un mensaje a tu correo para ayudarte a
          restablecer tu contraseña.
        </Text>
        <Controller
          control={control}
          name="email"
          render={({field: {onChange, value}}) => (
            <InputText
              value={value}
              onChangeText={text => onChange(text)}
              error={errors.email?.message}
              placeholder="maria@gmail.com"
              label="Correo electrónico"
            />
          )}
        />
        <View style={styles.separator} />
        <ContainedButton
          onPress={handleSubmit(onSubmit)}
          title="Continuar"
          backgroundColor={COLORS.primaryGreen}
          isFulled
          isLoading={isLoading}
        />
      </KeyboardAwareScrollView>
    </ModalView>
  );
};

export default ForgetPasswordModal;

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    color: GRAY_COLORS.gray900,
    textAlign: 'center',
  },
  description: {
    marginTop: 10,
    marginBottom: 25,
    fontSize: 15,
    color: GRAY_COLORS.gray900,
    lineHeight: 24,
  },
  separator: {
    marginTop: 15,
  },
});
