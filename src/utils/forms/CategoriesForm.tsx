import React from 'react';
import * as Yup from 'yup';
import { Alert, StyleSheet, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { validator } from './validator';
import InputText from '../inputs/InputText';
import ContainedButton from '../buttons/ContainedButton';
import { COLORS } from '../../constants';
import { useErrorsContext } from '../../context/ErrorsContext';
import SelectInput from '../inputs/SelectInput';
import { useCreateCategories } from '../../hooks/useCategories';
import uuid from 'react-native-uuid';

const schema = Yup.object().shape({
  // currency: Yup.string().trim('Ingresa una moneda válida').required('La moneda es requerida'),
  name: Yup.string().required('El nombre es requerido').trim('El nombre es requerido'),
  scope: Yup.string().required('La categoria es requerida'),
});

const CategoriesForm = () => {
  const options = [
    {
      label: 'Gastos',
      value: 'expense',
    },
    {
      label: 'Ingresos',
      value: 'income',
    },
  ];
  const { error, setErrors } = useErrorsContext();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: (data) => validator(data, schema),
    defaultValues: {
      name: '',
      scope: options[0].value, // Set the default value to the first option
    },
  });
  const { mutate: saveCategories, isLoading } = useCreateCategories();

  const onSubmitCategory = (data: any) => {
    const id = uuid.v4();
    const params = {
      id,
      name: data.name,
      scope: data.scope,
    };
    saveCategories(
      {
        id,
        params,
      },
      {
        onSuccess: () => {
          Alert.alert('Success', 'Category created successfully🎉');
          reset();
        },
        onError: (e: any) => {
          setErrors(e.response.data?.detail);
          Alert.alert('Error', 'Error al crear cateroria');
        },
      }
    );
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <InputText
            value={value}
            onChangeText={(text) => onChange(text)}
            error={errors.name?.message || error?.name}
            placeholder="Casa"
            label="Nombre"
            isBorderFull={false}
          />
        )}
      />
      <View style={styles.separator} />
      <Controller
        control={control}
        name="scope"
        render={({ field: { onChange, value } }) => (
          <SelectInput
            label="Cuenta"
            options={options}
            selectedValue={value}
            onValueChange={(selectedValue) => onChange(selectedValue)}
            placeholder="Seleciona"
            error={errors.scope?.message || error?.scope}
          />
        )}
      />

      <View style={styles.containedButton}>
        <ContainedButton
          onPress={handleSubmit(onSubmitCategory)}
          title="Guardar"
          isFulled={true}
          isLoading={isLoading}
          backgroundColor={COLORS.secondary}
        />
      </View>
    </View>
  );
};

export default CategoriesForm;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4,
  },
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
