import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import Cards from '../common/Cards';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, COLOR_OPACITY, GRAY_COLORS } from '../../constants';
const wallets = [
  { name: 'Cash', amount: 3000.5 },
  { name: 'Bank', amount: 5000.0 },
  { name: 'Bank', amount: 5000.0 },
];

type WalletsCardProps = {
  handleOpenAddBank: () => void;
};

const WalletsCard = ({ handleOpenAddBank }: WalletsCardProps) => {
  return (
    <Cards>
      <View style={styles.titleBox}>
        <Text style={styles.title}>Wallets</Text>
        <Text style={[styles.title, styles.totalMoney]}>Total: $7500</Text>
      </View>
      <View style={styles.box}>
        <Pressable style={[styles.buttonContainer, styles.buttonAdd]} onPress={handleOpenAddBank}>
          <Icon name="add-circle" size={45} color={COLORS.secondary} />
          <Text style={[styles.textAdd]}>Add</Text>
        </Pressable>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {wallets.map((wallet, index) => (
            <Pressable key={index} style={[styles.buttonContainer, styles.buttonWallet]}>
              <View style={styles.iconButtonWallet}>
                <Icon name="wallet-outline" size={25} color={COLORS.white} />
              </View>
              <Text style={[styles.textWallet]}>{wallet.name}</Text>
              <Text style={[styles.textWallet, styles.textMoney]}>{wallet.amount}</Text>
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
