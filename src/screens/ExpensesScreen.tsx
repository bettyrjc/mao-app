import React, { useState } from 'react';
import uuid from 'react-native-uuid';
import { Alert, SafeAreaView } from 'react-native';
import ExpensesTemplate from '../templates/ExpensesTemplate';
import { useCreateExpense } from '../hooks/useExpenses';

const ExpensesScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { mutate: saveExpenses, isLoading: isLoadingAddExpeses } = useCreateExpense();

  console.log('isLoadingAddExpeses', isLoadingAddExpeses);
  const onNewExpenses = (data: any) => {
    const id = uuid.v4();
    const params = {
      id,
      amount: data.amount,
      date: selectedDate,
      account_id: '497ffb81-bb23-441f-8154-5b38eb5c6dee',
    };
    console.log('params', params);
    saveExpenses(
      { expenses_id: id, params },
      {
        onSuccess: () => {
          Alert.alert('Success', 'expenses created successfully');
        },
        onError: (error: any) => {
          console.log('____ERROR___', error.response.data);
          Alert.alert('Error', 'Error al crear gastos');
        },
      }
    );
  };

  return (
    <SafeAreaView>
      <ExpensesTemplate
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        onNewExpenses={onNewExpenses}
        isLoadingAddExpeses={isLoadingAddExpeses}
      />
    </SafeAreaView>
  );
};

export default ExpensesScreen;
