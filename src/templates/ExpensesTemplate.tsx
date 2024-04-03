import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AddExpensesForm from '../utils/forms/AddExpensesForm';

const ExpensesTemplate = ({ selectedDate, setSelectedDate, onNewExpenses, isLoadingAddExpeses }: any) => {
  return (
    <View>
      <Text style={styles.title}>ExpensesTemplate</Text>

      <AddExpensesForm
        onSubmit={onNewExpenses}
        isLoading={isLoadingAddExpeses}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
    </View>
  );
};

export default ExpensesTemplate;

const styles = StyleSheet.create({
  title: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    fontSize: 20,
  },
});
