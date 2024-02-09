import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { validator } from './validator';
import InputText from '../inputs/InputText';
import ContainedButton from '../buttons/ContainedButton';
import { COLORS, GRAY_COLORS } from '../../constants';
import PasswordInput from '../inputs/PasswordInput';
import { useErrorsContext } from '../../context/ErrorsContext';
import SelectInput from '../inputs/SelectInput';

// const convertOptions = (teamSize: any) =>
//   Object.entries(teamSize).map(item => ({
//     label: item[1],
//     value: item[1],
//   }));

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Ingresa un email válido')
    .trim('Ingresa un email válido')
    .required('El correo electrónico es requerido'),
  name: Yup.string()
    .required('El nombre es requerido')
    .matches(/^[A-Za-z]+$/, 'El nombre solo debe contener letras')
    .trim('El nombre es requerido'),
  pronoun: Yup.string().required('El pronomnbre es requerido'),
  last_name: Yup.string()
    .required('El apellido es requerido')
    .matches(/^[A-Za-z]+$/, 'El apellido solo debe contener letras')
    .trim('El apellido es requerido'),
  password: Yup.string().required('La contraseña es requerida'),
});
type FormData = {
  onSubmit: (data: any) => void;
  navigation: any;
  isLoading: boolean;
};
const RegisterForm = ({ onSubmit, navigation, isLoading }: FormData) => {
  const { error, setErrors } = useErrorsContext();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: (data) => validator(data, schema),
  });

  return (
    <>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <InputText
            value={value}
            onChangeText={(text) => onChange(text)}
            error={errors.name?.message || error.name}
            placeholder="Maria"
            label="Nombre"
            isBorderFull={false}
          />
        )}
      />
      <View style={styles.separator} />
      <Controller
        control={control}
        name="last_name"
        render={({ field: { onChange, value } }) => (
          <InputText
            value={value}
            onChangeText={(text) => onChange(text)}
            error={errors.last_name?.message || error?.last_name}
            placeholder="Perez"
            label="Apellido"
            isBorderFull={false}
          />
        )}
      />

      <Controller
        control={control}
        name="pronoun"
        render={({ field: { onChange, value } }) => (
          <SelectInput
            label="Pronombre"
            options={[
              { label: 'El', value: 'he' },
              { label: 'Ella', value: 'she' },
            ]}
            selectedValue={value}
            onValueChange={(selectedValue) => onChange(selectedValue)}
            placeholder="Seleciona"
            error={errors.pronoun?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <InputText
            value={value}
            keyboardType="email-address"
            onChangeText={(text) => onChange(text)}
            error={errors.email?.message || error.email}
            placeholder="maria@gmail.com"
            label="Correo electrónico"
            isBorderFull={false}
          />
        )}
      />
      <View style={styles.separator} />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <PasswordInput
            value={value}
            onChangeText={(text) => onChange(text)}
            error={errors.password?.message || error.password}
          />
        )}
      />
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setErrors([]);
          navigation.replace('LoginScreen');
        }}
      >
        <Text style={styles.buttonRegisterContained}>
          ¿Ya tienes cuenta?
          <Text style={styles.buttonRegisters}> Inicia sesión</Text>
        </Text>
      </TouchableOpacity>

      <View style={styles.containedButton}>
        <ContainedButton
          onPress={handleSubmit(onSubmit)}
          title="Registrarme"
          backgroundColor={COLORS.primary}
          isFulled={false}
          isLoading={isLoading}
        />
      </View>
    </>
  );
};

export default RegisterForm;

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
    marginTop: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgetPassword: {
    color: COLORS.warning,
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 12,
    textDecorationLine: 'underline',
  },
  separator: {
    marginBottom: 20,
  },
});
