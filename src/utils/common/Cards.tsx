import React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {COLORS, GRAY_COLORS} from '../../constants';

type CardType = {
  children: any;
  bgColor?: string;
};
const Cards = ({children, bgColor = COLORS.white}: CardType) => {
  return (
    <View style={{...styles.card, backgroundColor: bgColor}}>{children}</View>
  );
};

export const styles = StyleSheet.create({
  card: {
    minHeight: 55,
    borderWidth: 1,
    marginHorizontal: 10,
    borderColor: GRAY_COLORS.gray200,
    borderRadius: 10,
    boxShadow: ' 0px 4px 4px rgba(0, 0, 0, 0.08)',
    padding: 8,
    marginBottom: Platform.OS === 'ios' ? 6 : 4,
    color: GRAY_COLORS.gray900,
  },
});

export default Cards;
