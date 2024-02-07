import React from 'react';
import InputText from '../inputs/InputText';
import {StyleSheet, View, ScrollView} from 'react-native';
import ContainedButton from '../buttons/ContainedButton';
import {useForm, Controller} from 'react-hook-form';
import * as yup from 'yup';
import {validator} from './validator';

const schema = yup.object().shape({
  cellphone_number: yup
    .string()
    .required('El número de teléfono es requerido')
    .trim()
    .max(10, 'El número de teléfono debe tener 10 dígitos')
    .min(10, 'El número de teléfono debe tener 10 dígitos'),
  email: yup
    .string()
    .trim()
    .email('El correo electrónico es inválido')
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Ingresa un email válido',
    )
    .required('El correo electrónico es requerido'),
});

type EditAccountFormType = {
  handleModalOpenAddBank?: () => void;
  title?: string;
  onSubmitData: (dataBank: any) => void;
  names?: string;
  isLoading: boolean;
  defaultValues?: any;
};
const EditAccountForm = ({
  onSubmitData,
  isLoading,
  defaultValues = null,
}: EditAccountFormType) => {
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
      <InputText
        placeholder="Maria Roma"
        value={defaultValues.name + ' ' + defaultValues.last_name}
        label="Nombre del titular"
        disabled
      />
      <Controller
        control={control}
        name="email"
        render={({field: {onChange, value}}) => (
          <InputText
            keyboardType="email-address"
            placeholder="maria@gmail.com"
            value={value}
            onChangeText={text => onChange(text)}
            label="Correo*"
            error={errors.email?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="cellphone_number"
        render={({field: {onChange, value}}) => (
          <InputText
            keyboardType="ascii-capable"
            placeholder="412345789"
            value={value}
            onChangeText={text => onChange(text)}
            label="Teléfono*"
            error={errors.cellphone_number?.message}
          />
        )}
      />

      <View style={modalStyles.containerButton}>
        <ContainedButton
          title="Guardar"
          onPress={handleSubmit(onSubmitData)}
          fontSize={14}
          isFulled={false}
          isLoading={isLoading}
          width={'100%'}
        />
      </View>
    </ScrollView>
  );
};

const modalStyles = StyleSheet.create({
  box: {
    height: 'auto',
  },
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
    marginTop: 14,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
export default EditAccountForm;
