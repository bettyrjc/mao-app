import { Image, StyleSheet, View } from 'react-native';
import React, { useContext } from 'react';
import { COLORS } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoginForm from '../utils/forms/LoginForm';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthContext } from '../context/AuthContext';
interface Props extends NativeStackScreenProps<any, any> {}

const LoginScreen = ({ navigation }: Props) => {
  const { signIn, isLoading } = useContext(AuthContext);

  const onSubmit = (data: any) => {
    const { username, password } = data;
    signIn({
      username,
      password,
    });
  };
  return (
    <SafeAreaView style={styles.box}>
      <View style={styles.boxImage}>
        <Image source={require('../assets/budget.png')} />
      </View>
      <LoginForm onSubmit={onSubmit} navigation={navigation} handleOpenModal={() => {}} isLoading={isLoading} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
  },
  boxImage: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 70,
  },
});

export default LoginScreen;
