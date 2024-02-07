import {Text, StyleSheet} from 'react-native';
import React from 'react';
import {COLORS} from '../constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import LoginForm from '../utils/forms/LoginForm';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
// import DoodleIcon from '../components/icons/DoodleIcon';
interface Props extends NativeStackScreenProps<any, any> {}

const LoginScreen = ({navigation}: Props) => {
  return (
    <SafeAreaView style={styles.box}>
      <Text>LoginScreen</Text>
      <LoginForm
        onSubmit={() => {}}
        navigation={navigation}
        handleOpenModal={() => {}}
        isLoading={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor: COLORS.secondaryDark,
  },
});

export default LoginScreen;
