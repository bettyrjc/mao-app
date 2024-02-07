/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Linking,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import * as Yup from 'yup';
import {validator} from './validator';
import InputText from '../inputs/InputText';
import ContainedButton from '../buttons/ContainedButton';
import {COLORS, GRAY_COLORS} from '../../constants';
import PasswordInput from '../inputs/PasswordInput';
import SelectInput from '../inputs/SelectInput';
import CheckInput from '../inputs/CheckInput';
import {useErrorsContext} from '../../context/ErrorsContext';
import InputTel from '../inputs/InputTel';

const convertOptions = (teamSize: any) =>
  Object.entries(teamSize).map(item => ({
    label: item[1],
    value: item[1],
  }));

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Ingresa un email válido')
    .trim('Ingresa un email válido')
    .required('El correo electrónico es requerido'),
  name: Yup.string()
    .required('El nombre es requerido')
    .matches(/^[A-Za-z]+$/, 'El nombre solo debe contener letras')
    .trim('El nombre es requerido'),

  last_name: Yup.string()
    .required('El apellido es requerido')
    .matches(/^[A-Za-z]+$/, 'El apellido solo debe contener letras')
    .trim('El apellido es requerido'),
  cellphone_number: Yup.string()
    .required('El número de teléfono es requerido')
    .trim()
    .max(10, 'El número de teléfono no es válido')
    .min(10, 'El número de teléfono debe tener minimo 10 dígitos'),
  work_location_state: Yup.string().required(
    'El Estado de la República es requerido',
  ),
  password: Yup.string().required('La contraseña es requerida'),
  team_size: Yup.string().required('El tamaño del equipo laboral es requerido'),
  contracts_per_month: Yup.string().required(
    'El volumen de contratos por mes es requerido',
  ),
  privacy_policy: Yup.bool()
    .required('Aviso de privacidad es requerido')
    .oneOf([true], 'Debes aceptar el Aviso de privacidad'),
  terms_conditions: Yup.bool()
    .required('Términos y condiciones es requerido')
    .oneOf([true], 'Debes aceptar los términos y condiciones'),
});
type FormData = {
  onSubmit: (data: any) => void;
  setCountryCode: (data?: any) => void;
  navigation: any;
  isLoading: boolean;
  teamSize: any;
  contractsPerMonth: any;
  workLocationStates: any;
};
const RegisterForm = ({
  onSubmit,
  navigation,
  isLoading,
  teamSize,
  contractsPerMonth,
  workLocationStates,
  setCountryCode,
}: FormData) => {
  const {error, setErrors} = useErrorsContext();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: data => validator(data, schema),
  });
  const sizeOptions = convertOptions(teamSize);
  const contractOptions = convertOptions(contractsPerMonth);
  const workLocationsOptions = convertOptions(workLocationStates);

  const redirectToExternalLink = (urlForm: string) => {
    Linking.openURL(urlForm).catch(err => {
      console.error('Error al abrir el enlace:', err);
    });
  };
  return (
    <>
      <Controller
        control={control}
        name="name"
        render={({field: {onChange, value}}) => (
          <InputText
            value={value}
            onChangeText={text => onChange(text)}
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
        render={({field: {onChange, value}}) => (
          <InputText
            value={value}
            onChangeText={text => onChange(text)}
            error={errors.last_name?.message || error?.last_name}
            placeholder="Perez"
            label="Apellido"
            isBorderFull={false}
          />
        )}
      />
      <View style={styles.separator} />
      <Controller
        control={control}
        name="cellphone_number"
        render={({field: {onChange, value}}) => (
          <InputTel
            // keyboardType="phone-pad"
            placeholder="222 123 4567"
            isBorderFull={false}
            value={value}
            onChangeText={text => onChange(text)}
            label="Número de teléfono*"
            error={errors.cellphone_number?.message}
            onChangeCountry={country => {
              setCountryCode(country?.callingCode?.[0]);
            }}
          />
        )}
      />
      <View style={styles.separator} />

      <Controller
        control={control}
        name="work_location_state"
        render={({field: {onChange, value}}) => {
          return (
            <SelectInput
              label="¿En qué Estado de la República trabajas?"
              options={workLocationsOptions}
              selectedValue={value}
              onValueChange={selectedValue => onChange(selectedValue)}
              placeholder="Selecciona"
              error={
                errors.work_location_state?.message ||
                error?.broker_profile_attributes?.work_location_state
              }
            />
          );
        }}
      />
      <View style={styles.separator} />

      <Controller
        control={control}
        name="team_size"
        render={({field: {onChange, value}}) => (
          <SelectInput
            label="¿De qué tamaño es tu equipo de trabajo?"
            options={sizeOptions}
            selectedValue={value}
            onValueChange={selectedValue => onChange(selectedValue)}
            placeholder="Seleciona"
            error={
              errors.team_size?.message ||
              error?.broker_profile_attributes?.team_size
            }
          />
        )}
      />
      <View style={styles.separator} />

      <Controller
        control={control}
        name="contracts_per_month"
        render={({field: {onChange, value}}) => (
          <SelectInput
            label="El volumen de contratos de arrendamiento que acostumbras a cerrar cada mes"
            options={contractOptions}
            selectedValue={value}
            onValueChange={selectedValue => onChange(selectedValue)}
            placeholder="Seleciona"
            error={
              errors.contracts_per_month?.message ||
              error?.broker_profile_attributes?.contracts_per_month
            }
          />
        )}
      />
      <View style={styles.separator} />

      <Controller
        control={control}
        name="email"
        render={({field: {onChange, value}}) => (
          <InputText
            value={value}
            keyboardType="email-address"
            onChangeText={text => onChange(text)}
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
        render={({field: {onChange, value}}) => (
          <PasswordInput
            value={value}
            onChangeText={text => onChange(text)}
            error={errors.password?.message || error.password}
          />
        )}
      />
      <View style={styles.separator} />

      <Controller
        control={control}
        name="terms_conditions"
        render={({field: {onChange, value}}) => (
          <CheckInput
            label={
              <Pressable
                onPress={() =>
                  redirectToExternalLink(
                    'https://mica.rent/terminos-y-condiciones/',
                  )
                }>
                <Text>
                  Acepto los{' '}
                  <Text
                    style={{
                      color: COLORS.info,
                      textDecorationLine: 'underline',
                    }}>
                    Términos y condiciones{' '}
                  </Text>
                </Text>
              </Pressable>
            }
            error={errors.terms_conditions?.message}
            onChange={text => onChange(text)}
            checked={value}
          />
        )}
      />
      <View style={styles.separator} />
      <Controller
        control={control}
        name="privacy_policy"
        render={({field: {onChange, value}}) => (
          <CheckInput
            label={
              <Pressable
                onPress={() =>
                  redirectToExternalLink(
                    'https://mica.rent/aviso-de-privacidad/',
                  )
                }>
                <Text>
                  Acepto el{' '}
                  <Text
                    style={{
                      color: COLORS.info,
                      textDecorationLine: 'underline',
                    }}>
                    Aviso de Privacidad{' '}
                  </Text>
                </Text>
              </Pressable>
            }
            error={errors.privacy_policy?.message}
            onChange={text => onChange(text)}
            checked={value}
          />
        )}
      />
      <View style={styles.separator} />

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setErrors([]);
          navigation.replace('LoginScreen');
        }}>
        <Text style={styles.buttonRegisterContained}>
          ¿Ya tienes cuenta?
          <Text style={styles.buttonRegisters}> Inicia sesión</Text>
        </Text>
      </TouchableOpacity>

      <View style={styles.containedButton}>
        <ContainedButton
          onPress={handleSubmit(onSubmit)}
          title="Registrarme"
          backgroundColor={COLORS.primaryGreen}
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
    color: COLORS.primaryPurple,
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
