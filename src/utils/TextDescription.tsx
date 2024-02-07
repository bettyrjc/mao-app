import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {GRAY_COLORS} from '../constants';

type TextDescriptionTypes = {
  title: string;
  description: string;
};
const TextDescriptionTypes = ({title, description}: TextDescriptionTypes) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{description}</Text>
    </View>
  );
};

export default TextDescriptionTypes;
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: '600',
    color: GRAY_COLORS.gray900,
  },
  text: {
    fontSize: 18,
    fontWeight: '400',
    color: GRAY_COLORS.gray900,
    marginLeft: 4,
  },
});
