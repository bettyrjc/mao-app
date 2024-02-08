import { StyleSheet, Image, View } from 'react-native';
import React from 'react';
import { COLORS } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import RegisterForm from '../utils/forms/RegisterForm';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
// import DoodleIcon from '../components/icons/DoodleIcon';
interface Props extends NativeStackScreenProps<any, any> {}

const RegisterScreen = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={styles.box}>
      <View style={styles.boxImage}>
        <Image source={require('../assets/budget.png')} />
      </View>
      <RegisterForm onSubmit={() => {}} navigation={navigation} isLoading={false} />
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
