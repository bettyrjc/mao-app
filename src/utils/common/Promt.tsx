import React from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS} from '../../constants';

type PromtType = {
  children?: any;
  height?: number;
};
const Promt = ({children, height = 260}: PromtType) => {
  return <View style={{...styles.container, height: height}}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primaryPurple,
    marginBottom: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Promt;
