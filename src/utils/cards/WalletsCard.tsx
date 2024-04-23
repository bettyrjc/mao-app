import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import Cards from '../common/Cards';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, COLOR_OPACITY, GRAY_COLORS } from '../../constants';

type WalletsCardProps = {
  handleOpenAddBank: () => void;
  dataAccount: any;
};
type AccumulatorType = { currency: string; total: number }[];

type CurrencyTotal = { currency: string; total: number };
const WalletsCard = ({ handleOpenAddBank, dataAccount }: WalletsCardProps) => {
  const result = dataAccount?.data?.reduce((acc: AccumulatorType, item: any) => {
    const existingCurrency = acc.find((a: CurrencyTotal) => a.currency === item.currency);
    if (existingCurrency) {
      existingCurrency.total += item.balance;
    } else {
      acc.push({ currency: item.currency, total: item.balance });
    }
    return acc;
  }, []);

  return (
    <Cards>
      <View style={styles.titleBox}>
        <Text style={styles.title}>Cuentas</Text>
        <Text style={[styles.title, styles.totalMoney]}>
          Total: {result?.[0].total.toLocaleString('en-US', { style: 'currency', currency: result?.[0].currency })}{' '}
          {/* {result?.[0].currency} */}
        </Text>
      </View>
      <View style={styles.box}>
        <Pressable style={[styles.buttonContainer, styles.buttonAdd]} onPress={handleOpenAddBank}>
          <Icon name="add-circle" size={45} color={COLORS.secondary} />
          <Text style={[styles.textAdd]}>Añadir</Text>
        </Pressable>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {dataAccount?.data?.map((wallet: any, index: string) => (
            <Pressable key={index} style={[styles.buttonContainer, styles.buttonWallet]}>
              <View style={styles.iconButtonWallet}>
                <Icon name="wallet-outline" size={25} color={COLORS.white} />
              </View>
              <Text style={[styles.textWallet]} numberOfLines={1} ellipsizeMode="tail">
                {wallet.name}
              </Text>
              <Text style={[styles.textWallet, styles.textMoney]}>
                {wallet.balance} {wallet.currency}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </Cards>
  );
};

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
    alignItems: 'center',
  },
  titleBox: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalMoney: {
    fontSize: 15,
    fontWeight: 'bold',
    color: GRAY_COLORS.gray700,
  },
  buttonContainer: {
    width: 100,
    height: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  buttonAdd: {
    borderWidth: 2,
    borderColor: COLORS.secondary,
    borderStyle: 'dashed',
  },
  textAdd: {
    color: COLORS.secondary,
    fontSize: 18,
    fontWeight: 'bold',
  },

  buttonWallet: {
    backgroundColor: COLOR_OPACITY.yellow,
  },
  textWallet: {
    fontSize: 12,
  },
  textMoney: {
    fontWeight: 'bold',
    marginTop: 5,
    fontSize: 14,
  },
  iconButtonWallet: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default WalletsCard;
