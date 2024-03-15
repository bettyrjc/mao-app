import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { COLORS, GRAY_COLORS } from '../../constants';

type CardType = {
  children: any;
  bgColor?: string;
};
const Cards = ({ children, bgColor = COLORS.white }: CardType) => {
  return <View style={{ ...styles.card, backgroundColor: bgColor }}>{children}</View>;
};

export const styles = StyleSheet.create({
  card: {
    minHeight: 55,
    borderWidth: 1,
    marginHorizontal: 10,
    borderColor: GRAY_COLORS.gray200,
    borderRadius: 10,
    padding: 8,
    marginBottom: Platform.OS === 'ios' ? 6 : 4,
    color: GRAY_COLORS.gray900,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
});

export default Cards;
