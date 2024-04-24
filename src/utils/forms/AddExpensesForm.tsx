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
import DateInput from '../inputs/DateInput';
import { useCreateMovements } from '../../hooks/useMovements';
import uuid from 'react-native-uuid';

const schema = Yup.object().shape({
  amount: Yup.string().required('El monto es requerido'),
  // currency: Yup.string().trim('Ingresa una moneda válida').required('La moneda es requerida'),
  // account_id: Yup.string().required('El banco es requerido'),
});
type FormData = {
  selectedDate: any;
  setSelectedDate: () => void;
  dataAccount: any;
  isTransfer: boolean;
  categories: any;
  movement: string;
};
const AddExpensesForm = ({
  selectedDate,
  setSelectedDate,
  dataAccount,
  isTransfer,
  categories,
  movement,
}: FormData) => {
  const { mutate: saveMovements, isLoading } = useCreateMovements();
  const options = dataAccount?.data?.map((item: any) => ({
    label: item.name,
    value: item.id,
  }));

  const categoriesOptions = categories?.map((item: any) => ({
    label: item.name,
    value: item.id,
  }));
  const { error, setErrors } = useErrorsContext();
  console.log('error', error);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: (data) => validator(data, schema),
    defaultValues: {
      amount: '',
      account_id: options?.[0]?.value,
      origin_id: options?.[0]?.value,
      destination_id: options?.[0]?.value,
      category_id: categoriesOptions?.[0]?.value,
      date: selectedDate,
    },
  });

  const onNewExpenses = (data: any) => {
    const id = uuid.v4();
    const paramsMovements = {
      id,
      amount: data.amount,
      date: selectedDate.toISOString().replace(/(\d{4})-(\d{2})-(\d{2}).*/, '$3-$2-$1'),
      account_id: data.account_id,
      category_id: data.category_id,
    };
    const paramsTransfer = {
      id,
      amount: data.amount,
      date: selectedDate.toISOString().replace(/(\d{4})-(\d{2})-(\d{2}).*/, '$3-$2-$1'),
      origin_id: data.origin_id,
      destination_id: data.destination_id,
    };
    const params = movement === 'transfers' ? paramsTransfer : paramsMovements;

    saveMovements(
      {
        expenses_id: id,
        movement: movement,
        params,
      },
      {
        onSuccess: () => {
          Alert.alert('Success', 'expenses created successfully');
          reset();
        },
        onError: (e: any) => {
          setErrors(e.response.data?.detail);
          Alert.alert('Error', 'Error al crear gastos');
        },
      }
    );
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="amount"
        render={({ field: { onChange, value } }) => (
          <InputText
            value={value}
            onChangeText={(text) => onChange(text)}
            error={errors.amount?.message || error?.amount}
            placeholder="3000"
            label="Monto"
            isBorderFull={false}
          />
        )}
      />
      <View style={styles.separator} />

      <Controller
        control={control}
        name="date"
        render={({ field: { onChange, value } }) => (
          <DateInput
            value={value}
            onChangeText={(text: any) => onChange(text)}
            error={errors.date?.message || error.date}
            placeholder="Mercantil banco"
            label="Fecha"
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        )}
      />

      <View style={styles.separator} />

      {isTransfer ? (
        <>
          <Controller
            control={control}
            name="origin_id"
            render={({ field: { onChange, value } }) => (
              <SelectInput
                label="Origen"
                options={options}
                selectedValue={value}
                onValueChange={(selectedValue) => onChange(selectedValue)}
                placeholder="Seleciona"
                error={errors.origin_id?.message || error?.origin_id}
              />
            )}
          />
          <View style={styles.separator} />
          <Controller
            control={control}
            name="destination_id"
            render={({ field: { onChange, value } }) => (
              <SelectInput
                label="Destino"
                options={options}
                selectedValue={value}
                onValueChange={(selectedValue) => onChange(selectedValue)}
                placeholder="Seleciona"
                error={errors.destination_id?.message || error?.destination_id}
              />
            )}
          />
        </>
      ) : (
        <>
          <Controller
            control={control}
            name="account_id"
            render={({ field: { onChange, value } }) => (
              <SelectInput
                label="Cuenta"
                options={options}
                selectedValue={value}
                onValueChange={(selectedValue) => onChange(selectedValue)}
                placeholder="Seleciona"
                error={errors.account_id?.message || error?.account_id}
              />
            )}
          />
          <View style={styles.separator} />

          <Controller
            control={control}
            name="category_id"
            render={({ field: { onChange, value } }) => (
              <SelectInput
                label="Categoria"
                options={categoriesOptions}
                selectedValue={value}
                onValueChange={(selectedValue) => onChange(selectedValue)}
                placeholder="Seleciona"
                error={errors.category_id?.message}
              />
            )}
          />
        </>
      )}

      <View style={styles.containedButton}>
        <ContainedButton
          onPress={handleSubmit(onNewExpenses)}
          title="Guardar"
          isFulled={true}
          isLoading={isLoading}
          backgroundColor={COLORS.secondary}
        />
      </View>
    </View>
  );
};

export default AddExpensesForm;

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
