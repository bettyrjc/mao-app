/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {HeaderButtons} from 'react-navigation-header-buttons';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, COLOR_OPACITY, GRAY_COLORS} from '../../constants';
import {HeaderButton} from 'react-navigation-header-buttons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSearchContext} from '../../context/SearchContext';
import {useItemPressContext} from '../../context/ItemPressContext';
import SearchBarComponent from '../inputs/SearchInput';

type NavbarPropTypes = {
  title: string;
};
const Navbar = ({title = 'nombre'}: NavbarPropTypes) => {
  const navigation = useNavigation<any>();
  const {handleSearch, isSearch} = useSearchContext();
  const [user, setUser] = useState('');
  useEffect(() => {
    const getUser = async () => {
      try {
        const userStorage: any = await AsyncStorage.getItem('user');
        setUser(userStorage);
      } catch (error) {
        console.error('Error al obtener el usuario:', error);
      }
    };
    getUser();
  }, []);
  const parsearUser = user && JSON.parse(user);
  const name = parsearUser?.name?.charAt(0).toUpperCase();
  const lastname = parsearUser?.last_name?.charAt(0).toUpperCase();

  const {pressedItems} = useItemPressContext();

  return (
    <View style={styles.container}>
      {!isSearch && (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <TouchableOpacity>
            <Icon
              name="menu"
              color={COLORS.white}
              size={30}
              onPress={() => navigation.toggleDrawer()}
            />
          </TouchableOpacity>
        </HeaderButtons>
      )}
      {!isSearch ? (
        <>
          <Text style={styles.title}>{title}</Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            {(pressedItems[0] === 'dashboard_1' ||
              pressedItems[0] === 'deparments') && (
              <Pressable onPress={handleSearch}>
                <Icon name="search-outline" color={COLORS.white} size={20} />
              </Pressable>
            )}
            <View style={styles.initialsContainer}>
              <Text style={styles.initials}>{`${name}${lastname}`}</Text>
            </View>
          </View>
        </>
      ) : (
        <View style={styles.searchContainer}>
          <SearchBarComponent />
        </View>
      )}
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
    borderBottomWidth: 1,
    backgroundColor: COLORS.primaryPurple,
    paddingTop: Platform.OS === 'ios' ? 23 : 0,
    borderBottomColor: COLORS.white,
  },
  searchContainer: {
    position: 'absolute',
    right: 20,
    bottom: 5,
    top: Platform.OS === 'ios' ? 45 : 20,
    width: '100%',
    zIndex: 400,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  initialsContainer: {
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: COLOR_OPACITY.green10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  initials: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 20,
    textColor: GRAY_COLORS.gray800,
  },
});

export default Navbar;
