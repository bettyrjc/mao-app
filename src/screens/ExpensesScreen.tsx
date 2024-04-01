import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import ExpensesTemplate from '../templates/ExpensesTemplate';

const ExpensesScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <SafeAreaView>
      <ExpensesTemplate selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
    </SafeAreaView>
  );
};

export default ExpensesScreen;
