import { Text, Pressable, StyleSheet } from 'react-native';
import React from 'react';
// import Cards from '../common/Cards';

const ButtonResumen = () => {
  return (
    <Pressable style={styles.box}>
      <Text style={styles.title}>📝 Ver Resumen</Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  box: {
    flex: 1,
    paddingHorizontal: 4,
    width: '100%',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
export default ButtonResumen;
