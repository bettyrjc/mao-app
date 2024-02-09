import { StyleSheet, Image, View } from 'react-native';
import React, { useContext } from 'react';
import { COLORS } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import RegisterForm from '../utils/forms/RegisterForm';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthContext } from '../context/AuthContext';

import uuid from 'react-native-uuid';
// import DoodleIcon from '../components/icons/DoodleIcon';
interface Props extends NativeStackScreenProps<any, any> {}

const RegisterScreen = ({ navigation }: Props) => {
  const { signUp, isLoading } = useContext(AuthContext);

  const onSubmit = (data: any) => {
    const { name, email, last_name, password, pronoun } = data;
    const id = uuid.v4();
    console.log('id', id);
    signUp({
      id,
      name,
      email,
      last_name,
      password,
      pronoun,
    });
  };

  return (
    <SafeAreaView style={styles.box}>
      <View style={styles.boxImage}>
        <Image source={require('../assets/budget.png')} />
      </View>
      <RegisterForm onSubmit={onSubmit} navigation={navigation} isLoading={isLoading} />
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

export default RegisterScreen;
