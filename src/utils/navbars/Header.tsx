/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, COLOR_OPACITY, GRAY_COLORS } from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserContext } from '../../context/UserContext';

type NavbarPropTypes = {
  title: string;
};
const Navbar = ({ title = 'nombre' }: NavbarPropTypes) => {
  const navigation = useNavigation<any>();
  const { user } = useUserContext();

  // useEffect(() => {
  //   const getUser = async () => {
  //     try {
  //       const userStorage: any = await AsyncStorage.getItem('user');
  //       setUser(userStorage);
  //     } catch (error) {
  //       console.error('Error al obtener el usuario:', error);
  //     }
  //   };
  //   getUser();
  // }, []);
  const name = user?.name?.charAt(0).toUpperCase();
  const lastname = user?.last_name?.charAt(0).toUpperCase();

  return (
    <View style={styles.container}>
      <>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <View style={styles.initialsContainer}>
            <Text style={styles.initials}>{`${name}${lastname}`}</Text>
          </View>
          <Text style={styles.title}>{`${user.name}${lastname}.`}</Text>

        </View>
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: Platform.OS === 'ios' ? 100 : 80,
    paddingHorizontal: 20,
    borderBottomWidth: 2,
    backgroundColor: COLORS.white,
    paddingTop: Platform.OS === 'ios' ? 35 : 0,
    borderBottomColor: GRAY_COLORS.gray200,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: GRAY_COLORS.gray900,
  },
  initialsContainer: {
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: COLORS.secondaryDark,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  initials: {
    color: COLORS.secondary,
    fontWeight: 'bold',
    fontSize: 20,
    textColor: GRAY_COLORS.gray800,
  },
});

export default Navbar;
