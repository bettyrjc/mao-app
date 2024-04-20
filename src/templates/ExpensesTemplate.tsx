import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AddExpensesForm from '../utils/forms/AddExpensesForm';
import { COLORS, COLOR_OPACITY, GRAY_COLORS } from '../constants';
import OutlinedButton from '../utils/buttons/OutlinedButton';
import Cards from '../utils/common/Cards';

const ExpensesTemplate = ({
  selectedDate,
  setSelectedDate,
  onNewExpenses,
  isLoadingAddExpeses,
  dataAccount,
  setMovementType,
  movement,
}: any) => {
  return (
    <View>
      <View style={styles.container}>
        <OutlinedButton
          onPress={() => setMovementType('incomes')}
          title="Ingresos"
          isLoading={false}
          backgroundColor={COLORS.secondary}
          width={100}
          isFulled={false}
          color={movement === 'incomes' ? COLOR_OPACITY.green10 : 'transparent'}
        />
        <OutlinedButton
          onPress={() => setMovementType('expenses')}
          title="Gastos"
          isLoading={false}
          backgroundColor={COLORS.secondary}
          width={90}
          isFulled={false}
          color={movement === 'expenses' ? COLOR_OPACITY.green10 : 'transparent'}
        />
        <OutlinedButton
          onPress={() => setMovementType('transfers')}
          title="Transferencias"
          isLoading={false}
          backgroundColor={COLORS.secondary}
          width={155}
          color={movement === 'transfers' ? COLOR_OPACITY.green10 : 'transparent'}
          isFulled={false}
        />
      </View>
      <Cards>
        <Text style={styles.title}>
          {movement === 'incomes' ? 'Ingresos' : movement === 'expenses' ? 'Gastos' : 'Transferencias'}
        </Text>
        <View style={styles.separator} />
        <AddExpensesForm
          dataAccount={dataAccount}
          onSubmit={onNewExpenses}
          isLoading={isLoadingAddExpeses}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          isTransfer={movement === 'transfers'}
        />
      </Cards>
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
    fontWeight: 'bold',
    width: '100%',
  },
  separator: {
    borderBottomWidth: 2,
    borderBottomColor: GRAY_COLORS.gray100,
    marginBottom: 20,
  },
  container: {
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  // buttonMovements: {},
});
