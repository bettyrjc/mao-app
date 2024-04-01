/* eslint-disable react-native/no-inline-styles */
import { View, Text, StyleSheet, SafeAreaView, Pressable } from 'react-native';
import React from 'react';
import Cards from '../utils/common/Cards';
import { useUserContext } from '../context/UserContext';
import { COLORS, GRAY_COLORS } from '../constants';

const TextContent = ({ name, text }: any) => {
  return (
    <View style={{ display: 'flex', flexDirection: 'row' }}>
      <Text style={{ fontWeight: 'bold', marginRight: 5, marginBottom: 7, fontSize: 16 }}>{name}:</Text>
      <Text style={{ fontSize: 16 }}>{text}</Text>
    </View>
  );
};
const UserScreen = () => {
  const { user } = useUserContext();

  return (
    <SafeAreaView style={styles.box}>
      <Cards>
        <View
          style={{
            borderBottomWidth: 2,
            borderBottomColor: GRAY_COLORS.gray200,
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              fontWeight: 'bold',
              marginRight: 2,
              fontSize: 24,
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

      {/* <Cards>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: GRAY_COLORS.gray200,
            marginBottom: 10,
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
          <TextContent text={user?.name} name={'Nombre'} />
          <TextContent text={user?.last_name} name={'Apellido'} />
          <TextContent text={user?.email} name={'Email'} />
        </View>
      </Cards> */}

      <Pressable style={styles.boxButton}>
        <Text style={styles.textButton}>Logout</Text>
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
});
export default UserScreen;
