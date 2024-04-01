import React from 'react';
import * as Yup from 'yup';
import { StyleSheet, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { validator } from './validator';
import InputText from '../inputs/InputText';
import ContainedButton from '../buttons/ContainedButton';
import { COLORS } from '../../constants';
import { useErrorsContext } from '../../context/ErrorsContext';
import SelectInput from '../inputs/SelectInput';

const schema = Yup.object().shape({
  currency: Yup.string().trim('Ingresa una moneda válida').required('La moneda es requerida'),
  name: Yup.string().required('El nombre es requerido').trim('El nombre es requerido'),
  balance: Yup.string().required('El balance es requerido'),
});
type FormData = {
  onSubmit: (data: any) => void;
  isLoading: boolean;
};
const AddAccountForm = ({ onSubmit, isLoading }: FormData) => {
  const { error } = useErrorsContext();
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
            placeholder="Mercantil banco"
            label="Account name"
            isBorderFull={false}
          />
        )}
      />
      <View style={styles.separator} />
      <Controller
        control={control}
        name="balance"
        render={({ field: { onChange, value } }) => (
          <InputText
            value={value}
            onChangeText={(text) => onChange(text)}
            error={errors.balance?.message || error?.balance}
            placeholder="3000"
            label="Current balance"
            isBorderFull={false}
          />
        )}
      />
      <View style={styles.separator} />
      <Controller
        control={control}
        name="currency"
        render={({ field: { onChange, value } }) => (
          <SelectInput
            label="Currency"
            options={[
              { label: 'Bolivares', value: 'bolivares' },
              { label: 'Dolares', value: 'dolares' },
              { label: 'Pesos', value: 'pesos' },
            ]}
            selectedValue={value}
            onValueChange={(selectedValue) => onChange(selectedValue)}
            placeholder="Seleciona"
            error={errors.currency?.message}
          />
        )}
      />

      <View style={styles.containedButton}>
        <ContainedButton
          onPress={handleSubmit(onSubmit)}
          title="Save"
          isFulled={true}
          isLoading={isLoading}
          backgroundColor={COLORS.secondary}
        />
      </View>
    </>
  );
};

export default AddAccountForm;

const styles = StyleSheet.create({
  containedButton: {
    marginTop: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  separator: {
    marginBottom: 20,
  },
});