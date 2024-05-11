import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Table, Row } from 'react-native-table-component';

import WalletsCard from '../utils/cards/WalletsCard';
import ButtonResumen from '../utils/buttons/ButtonResumen';
import AddAccountModal from '../utils/modals/AddAccountModal';
import Cards from '../utils/common/Cards';
import { GRAY_COLORS } from '../constants';
import DetailModal from '../utils/modals/DetailModal';

type DashboardTemplateProps = {
  onNewAccount: (data: any) => void;
  isLoadingAddAccount: boolean;
  dataAccount: any;
  dataMovements: any[];
  setOpenAddBank: (value: boolean) => void;
  openAddBank: boolean;
  handleOpenDetailModal: (id: string) => void;
  handleCloseDetailModal: () => void;
  movement: any;
  isLoading: boolean;
  openDetailModal: boolean;
  isLoadingMovements: boolean;
};

const DashboardTemplate = ({
  onNewAccount,
  isLoadingAddAccount,
  dataAccount,
  dataMovements,
  setOpenAddBank,
  openAddBank,
  handleOpenDetailModal,
  handleCloseDetailModal,
  movement,
  isLoading,
  openDetailModal,
  isLoadingMovements,
}: DashboardTemplateProps) => {
  const tableHead = ['Fecha', 'Monto', 'Tipo'];
  const tableData =
    dataMovements?.map((item) => ({ id: item.id, data: [item.date, item.amount.toString(), item.type] })) || [];

  const handleOpenAddBank = () => {
    setOpenAddBank(!openAddBank);
  };

  return (
    <View>
      <WalletsCard handleOpenAddBank={handleOpenAddBank} dataAccount={dataAccount || []} />
      <Cards>
        <Text style={styles.title}>📝 Resumen</Text>
        <ButtonResumen />
        {isLoadingMovements ? (
          <Text>cargando...</Text>
        ) : (
          <ScrollView>
            {tableData?.length > 0 ? (
              <Table>
                <Row data={tableHead} style={styles.head} textStyle={styles.text} />
                {tableData?.map((rowData, index) => (
                  <Pressable key={index} onPress={() => handleOpenDetailModal(rowData?.id)} style={styles.border}>
                    <Row key={index} data={rowData?.data} style={styles.row} textStyle={styles.text} />
                  </Pressable>
                ))}
              </Table>
            ) : (
              <Text style={styles.notData}>No hay movimientos</Text>
            )}
          </ScrollView>
        )}
      </Cards>

      <AddAccountModal
        openAddBank={openAddBank}
        handleModalOpenAddBank={handleOpenAddBank}
        onSubmitData={onNewAccount}
        names={'names'}
        isLoading={isLoadingAddAccount}
        defaultValues={{}}
      />
      <DetailModal
        open={openDetailModal}
        handleModal={handleCloseDetailModal}
        isLoading={isLoading}
        movement={movement}
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
  border: { borderColor: GRAY_COLORS.gray200, borderBottomWidth: 1 },
  text: { textAlign: 'center' },
  row: { height: 30 },
  notData: {
    textAlign: 'center',
    fontSize: 16,
    color: GRAY_COLORS.gray500,
    marginBottom: 20,
    marginTop: 20,
  },
});
