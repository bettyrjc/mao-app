import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import ExpensesTemplate from '../templates/ExpensesTemplate';
import { useAccounts } from '../hooks/useAccount';
import { useCategories } from '../hooks/useCategories';

const ExpensesScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [movement, setMovement] = useState('expenses');
  const { data: categories } = useCategories();
  const { data: dataAccount } = useAccounts();

  const setMovementType = (type: string) => {
    setMovement(type);
  };

  return (
    <SafeAreaView>
      <ExpensesTemplate
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        dataAccount={dataAccount}
        setMovementType={setMovementType}
        movement={movement}
        categories={categories?.data || []}
      />
    </SafeAreaView>
  );
};

export default ExpensesScreen;
