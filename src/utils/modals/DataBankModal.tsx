/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import ModalView from './ModalView';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {COLORS, COLOR_OPACITY, GRAY_COLORS} from '../../constants';
import ContainedButton from '../buttons/ContainedButton';
import {globalThemes} from '../../themes/GlobalThemes';
import TextDescriptionTypes from '../TextDescription';

type DataBankModalProps = {
  openDataBank: boolean;
  handleModalOpenDataBank: () => void;
  handleModalOpenAddBank: () => void;
  dataBank: any;
};

const DataBankModal = ({
  openDataBank,
  handleModalOpenDataBank,
  handleModalOpenAddBank,
  dataBank,
}: DataBankModalProps) => {
  return (
    <ModalView
      modalVisible={openDataBank}
      handleModal={handleModalOpenDataBank}>
      <View style={{marginBottom: 10}}>
        <View style={[styles.titleContainer, globalThemes.flexBetween]}>
          <Text style={styles.cardTitle}>Datos de la cuenta</Text>
          <View>
            <ContainedButton
              backgroundColor={COLOR_OPACITY.purple}
              textColor={COLORS.primaryPurple}
              isFulled={false}
              width={72}
              title="Editar"
              onPress={handleModalOpenAddBank}
            />
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{paddingTop: 15}}>
          <TextDescriptionTypes
            title="Nombre y apellido:"
            description={dataBank?.holder_name}
          />
          <TextDescriptionTypes title="Correo:" description={dataBank?.email} />
          <TextDescriptionTypes
            title="Banco:"
            description={dataBank?.bank_name}
          />
          <TextDescriptionTypes
            title="Número de cuenta:"
            description={dataBank?.account_number}
          />
          <TextDescriptionTypes
            title="Clabe bancaria:"
            description={dataBank?.clabe}
          />
        </ScrollView>
      </View>
    </ModalView>
  );
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 8,
    paddingBottom: 10,
  },
  titleContainer: {
    marginTop: -5,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: GRAY_COLORS.gray300,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: GRAY_COLORS.gray900,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: GRAY_COLORS.gray900,
  },
  text: {
    fontSize: 16,
    fontWeight: '300',
    color: GRAY_COLORS.gray900,
    marginLeft: 4,
  },
});
export default DataBankModal;
