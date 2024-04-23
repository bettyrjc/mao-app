import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Table, Row } from 'react-native-table-component';

import WalletsCard from '../utils/cards/WalletsCard';
import ButtonResumen from '../utils/buttons/ButtonResumen';
import AddAccountModal from '../utils/modals/AddAccountModal';
import Cards from '../utils/common/Cards';
import { GRAY_COLORS } from '../constants';
type DashboardTemplateProps = {
  onNewAccount: (data: any) => void;
  isLoadingAddAccount: boolean;
  dataAccount: any;
  dataMovements: any[];
};

const DashboardTemplate = ({
  onNewAccount,
  isLoadingAddAccount,
  dataAccount,
  dataMovements,
}: DashboardTemplateProps) => {
  const tableHead = ['Fecha', 'Monto', 'Tipo'];
  const tableData = dataMovements?.map((item) => [item.date, item.amount.toString(), item.type]) || [];

  const [openAddBank, setOpenAddBank] = React.useState(false);
  const handleOpenAddBank = () => {
    setOpenAddBank(!openAddBank);
  };

  return (
    <View>
      <WalletsCard handleOpenAddBank={handleOpenAddBank} dataAccount={dataAccount} />
      <Cards>
        <Text style={styles.title}>📝 Ver Resumen</Text>
        <ButtonResumen />
        <ScrollView>
          <Table>
            <Row data={tableHead} style={styles.head} textStyle={styles.text} />
            {tableData?.map((rowData, index) => (
              <Row key={index} data={rowData} style={styles.row} textStyle={styles.text} />
            ))}
          </Table>
        </ScrollView>
      </Cards>

      <AddAccountModal
        openAddBank={openAddBank}
        handleModalOpenAddBank={handleOpenAddBank}
        onSubmitData={onNewAccount}
        names={'names'}
        isLoading={isLoadingAddAccount}
        defaultValues={{}}
      />
    </View>
  );
};

export default DashboardTemplate;
const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    paddingLeft: 10,
  },
  head: { height: 40 },
  border: { borderColor: GRAY_COLORS.gray500, borderWidth: 1 },
  text: { textAlign: 'center' },
  row: { height: 30 },
});
