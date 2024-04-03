/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { validator } from './validator';
import InputText from '../inputs/InputText';
import ContainedButton from '../buttons/ContainedButton';
import { COLORS, GRAY_COLORS } from '../../constants';
import PasswordInput from '../inputs/PasswordInput';
import { useErrorsContext } from '../../context/ErrorsContext';

const schema = Yup.object().shape({
  username: Yup.string().email('Ingresa un email válido').required('El email es requerido').trim(),
  password: Yup.string().required('La contraseña es requerida').trim('La contraseña es incorrecta'),
});
type FormData = {
  onSubmit: (data: any) => void;
  navigation: any;
  handleOpenModal: () => void;
  isLoading: boolean;
};
const LoginForm = ({ onSubmit, navigation, handleOpenModal, isLoading }: FormData) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: (data) => validator(data, schema),
  });
  const { error, setErrors } = useErrorsContext();

  return (
    <View>
      <Controller
        control={control}
        name="username"
        render={({ field: { onChange, value } }) => (
          <InputText
            value={value}
            onChangeText={(text) => onChange(text)}
            error={errors.username?.message || error?.username}
            placeholder="maria@gmail.com"
            nameIcon="mail-outline"
            label="Correo electrónico"
            isBorderFull={false}
            sizeIcon={20}
            keyboardType="email-address"
          />
        )}
      />
      <View style={{ marginBottom: 20 }} />
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <PasswordInput
            value={value}
            onChangeText={(text) => onChange(text)}
            error={errors?.password?.message || error?.password}
          />
        )}
      />
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setErrors([]);
          navigation.replace('RegisterScreen');
        }}
      >
        <Text style={styles.buttonRegisterContained}>
          ¿No tienes cuenta?
          <Text style={styles.buttonRegisters}> Regístrate</Text>
        </Text>
      </TouchableOpacity>
      <Pressable onPress={handleOpenModal}>
        <Text style={styles.forgetPassword}>¿Se te olvidó la contraseña?</Text>
      </Pressable>
      <View style={styles.containedButton}>
        <ContainedButton
          onPress={handleSubmit(onSubmit)}
          title="Iniciar Sesión"
          backgroundColor={COLORS.primary}
          isFulled={false}
          isLoading={isLoading}
        />
      </View>
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  buttonRegisterContained: {
    color: GRAY_COLORS.gray900,
    marginTop: 10,
  },
  buttonRegisters: {
    color: COLORS.secondary,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  containedButton: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgetPassword: {
    color: COLORS.warning,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    paddingBottom: 10,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
