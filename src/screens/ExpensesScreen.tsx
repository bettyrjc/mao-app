import React, { useState } from 'react';
import uuid from 'react-native-uuid';
import { Alert, SafeAreaView } from 'react-native';
import ExpensesTemplate from '../templates/ExpensesTemplate';
import { useCreateExpense } from '../hooks/useExpenses';
import { useAccounts } from '../hooks/useAccount';

const ExpensesScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { mutate: saveExpenses, isLoading: isLoadingAddExpeses } = useCreateExpense();
  const { data: dataAccount } = useAccounts();

  console.log('isLoadingAddExpeses', isLoadingAddExpeses);
  const onNewExpenses = (data: any) => {
    const id = uuid.v4();
    const params = {
      id,
      amount: data.amount,
      date: selectedDate.toISOString().replace(/(\d{4})-(\d{2})-(\d{2}).*/, '$3-$2-$1'),
      account_id: data.account_id,
    };
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
        dataAccount={dataAccount}
      />
    </SafeAreaView>
  );
};

export default ExpensesScreen;
