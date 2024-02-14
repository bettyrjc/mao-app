import React from 'react';
import { ActivityIndicator, Image, SafeAreaView, StyleSheet } from 'react-native';

const LoadingScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* <Image source={require('../assets/mica.png')} /> */}

      <ActivityIndicator style={styles.activityIndicator} size="small" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityIndicator: {
    marginTop: 16,
  },
});
export default LoadingScreen;
