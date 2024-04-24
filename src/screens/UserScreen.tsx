/* eslint-disable react-native/no-inline-styles */
import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable } from 'react-native';
import Cards from '../utils/common/Cards';
import { useUserContext } from '../context/UserContext';
import { COLORS, GRAY_COLORS } from '../constants';
import { AuthContext } from '../context/AuthContext';
import CategoriesForm from '../utils/forms/CategoriesForm';

const TextContent = ({ name, text }: any) => {
  return (
    <View style={{ display: 'flex', flexDirection: 'row' }}>
      <Text style={{ fontWeight: '600', marginRight: 5, marginBottom: 7, fontSize: 16 }}>{name}:</Text>
      <Text style={{ fontSize: 16 }}>{text}</Text>
    </View>
  );
};
const UserScreen = () => {
  const { user } = useUserContext();
  const { logOut } = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.box}>
      <Cards>
        <View
          style={{
            borderBottomWidth: 2,
            borderBottomColor: GRAY_COLORS.gray100,
            marginBottom: 10,
            marginTop: 5,
          }}
        >
          <Text
            style={{
              fontWeight: '600',
              marginRight: 2,
              fontSize: 20,
              paddingBottom: 3,
            }}
          >
            Datos
          </Text>
        </View>
        <View>
          <TextContent text={user?.name} name={'Nombre'} />
          <TextContent text={user?.last_name} name={'Apellido'} />
          <TextContent text={user?.email} name={'Email'} />
        </View>
      </Cards>
      <View style={styles.separator} />

      <Cards>
        <View
          style={{
            marginTop: 10,
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontWeight: 'bold',
              marginRight: 2,
              fontSize: 18,
              paddingBottom: 3,
            }}
          >
            Nueva categoria
          </Text>
        </View>
        <View>
          <CategoriesForm />
        </View>
      </Cards>

      <Pressable style={styles.boxButton} onPress={logOut}>
        <Text style={styles.textButton}>Cerrar sesión</Text>
      </Pressable>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  box: {
    flex: 1,
    paddingHorizontal: 4,
    marginTop: 20,
  },
  boxButton: {
    backgroundColor: COLORS.danger,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  textButton: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 18,
  },
  separator: {
    marginBottom: 20,
  },
});
export default UserScreen;
