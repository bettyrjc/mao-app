import React, { useState } from 'react';
import uuid from 'react-native-uuid';
import { Alert, SafeAreaView } from 'react-native';
import ExpensesTemplate from '../templates/ExpensesTemplate';
import { useCreateMovements } from '../hooks/useMovements';
import { useAccounts } from '../hooks/useAccount';

const ExpensesScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [movement, setMovement] = useState('expenses');
  const { mutate: saveMovements, isLoading: isLoadingAddExpeses } = useCreateMovements();
  const { data: dataAccount } = useAccounts();

  const setMovementType = (type: string) => {
    setMovement(type);
  };
  const onNewExpenses = (data: any) => {
    const id = uuid.v4();
    const paramsMovements = {
      id,
      amount: data.amount,
      date: selectedDate.toISOString().replace(/(\d{4})-(\d{2})-(\d{2}).*/, '$3-$2-$1'),
      account_id: data.account_id,
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
        },
        onError: (error: any) => {
          console.error('____ERROR___', error.response.data);
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
        setMovementType={setMovementType}
        movement={movement}
      />
    </SafeAreaView>
  );
};

export default ExpensesScreen;
