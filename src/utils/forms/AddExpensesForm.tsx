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
import DateInput from '../inputs/DateInput';
import Cards from '../common/Cards';

const schema = Yup.object().shape({
  // currency: Yup.string().trim('Ingresa una moneda válida').required('La moneda es requerida'),
  amount: Yup.string().required('El nombre es requerido').trim('El nombre es requerido'),
  account_id: Yup.string().required('El balance es requerido'),
});
type FormData = {
  onSubmit: (data: any) => void;
  isLoading: boolean;
  selectedDate: string;
  setSelectedDate: () => void;
};
const AddExpensesForm = ({ onSubmit, isLoading, selectedDate, setSelectedDate }: FormData) => {
  const { error } = useErrorsContext();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: (data) => validator(data, schema),
  });

  return (
    <View style={styles.container}>
      <Cards>
        <Controller
          control={control}
          name="amount"
          render={({ field: { onChange, value } }) => (
            <InputText
              value={value}
              onChangeText={(text) => onChange(text)}
              error={errors.amount?.message || error?.amount}
              placeholder="3000"
              label="Amount"
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
              error={errors.name?.message || error.name}
              placeholder="Mercantil banco"
              label="Account name"
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          )}
        />

        <View style={styles.separator} />
        <Controller
          control={control}
          name="account_id"
          render={({ field: { onChange, value } }) => (
            <SelectInput
              label="Account"
              options={[
                { label: 'Mercantil', value: '1' },
                { label: 'Binance', value: '2' },
                { label: 'Bancaribe', value: '3' },
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
      </Cards>
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
