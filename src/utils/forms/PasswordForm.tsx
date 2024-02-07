import React from 'react';
import {GRAY_COLORS} from '../../constants';
import {StyleSheet, View, ScrollView} from 'react-native';
import ContainedButton from '../buttons/ContainedButton';
import {useForm, Controller} from 'react-hook-form';
import * as yup from 'yup';
import {validator} from './validator';
import PasswordInput from '../inputs/PasswordInput';

const schema = yup.object().shape({
  password: yup.string().required('La  contraseña actual es requerida'),
  new_password: yup.string().required('La nueva contraseña es requerida'),
  confirmation_password: yup.string().required('La confirmación es requerida'),
});

type PasswordFormType = {
  onSubmitData: (dataBank: any) => void;
  isLoading: boolean;
  defaultValues?: any;
  onCancel: () => void;
};
const PasswordForm = ({
  onSubmitData,
  isLoading,
  onCancel,
  defaultValues = null,
}: PasswordFormType) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: data => validator(data, schema),
    defaultValues: {
      ...defaultValues,
    },
  });

  return (
    <ScrollView>
      <Controller
        control={control}
        name="password"
        render={({field: {onChange, value}}) => (
          <PasswordInput
            value={value}
            onChangeText={text => onChange(text)}
            error={errors.password?.message} //|| error.password
            isBorderFull
            label="Contraseña actual*"
          />
        )}
      />
      <Controller
        control={control}
        name="new_password"
        render={({field: {onChange, value}}) => (
          <PasswordInput
            value={value}
            onChangeText={text => onChange(text)}
            error={errors.new_password?.message} //|| error.password
            isBorderFull
            label="Nueva contraseña*"
          />
        )}
      />
      <Controller
        control={control}
        name="confirmation_password"
        render={({field: {onChange, value}}) => (
          <PasswordInput
            value={value}
            onChangeText={text => onChange(text)}
            error={errors.confirmation_password?.message} //|| error.password
            isBorderFull
            label="Confirmar contraseña*"
          />
        )}
      />
      <View style={modalStyles.containerButton}>
        <ContainedButton
          title="Cancelar"
          onPress={onCancel}
          fontSize={14}
          isFulled={false}
          backgroundColor={GRAY_COLORS.gray200}
          textColor={GRAY_COLORS.gray900}
          weight="500"
          width={120}
        />
        <ContainedButton
          title="Aceptar"
          onPress={handleSubmit(onSubmitData)}
          fontSize={14}
          isFulled={false}
          isLoading={isLoading}
          width={120}
        />
      </View>
    </ScrollView>
  );
};

const modalStyles = StyleSheet.create({
  container: {
    marginBottom: 2,
  },
  title: {
    fontSize: 20,
    letterSpacing: 0.7,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  containerButton: {
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
export default PasswordForm;
