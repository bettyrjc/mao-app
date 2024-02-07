import React, {useContext} from 'react';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {COLORS, COLOR_OPACITY, GRAY_COLORS} from '../../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../../context/AuthContext';
import {useItemPressContext} from '../../context/ItemPressContext';
import {useSearchContext} from '../../context/SearchContext';
// import AsyncStorage from '@react-native-async-storage/async-storage';

type ButtonPressableProps = {
  onPress: () => void;
  handlePressIn: () => void;
  isPressed: boolean;
  text: string;
  icon: string;
};

const ButtonPressable = ({
  onPress,
  handlePressIn,
  isPressed,
  text,
  icon,
}: ButtonPressableProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, isPressed && styles.pressablePressed]}
      onPressIn={handlePressIn}>
      <Icon
        name={icon}
        size={25}
        color={isPressed ? COLORS.primaryGreen : GRAY_COLORS.gray500}
      />
      <Text style={[styles.text, isPressed && styles.pressableTextPressed]}>
        {text}
      </Text>
    </Pressable>
  );
};

const Sidebar = () => {
  const {handleItemPressIn, isItemPressed, pressedItems} =
    useItemPressContext();
  const {logOut} = useContext(AuthContext);
  const {setIsSearch, setSearch} = useSearchContext();
  const navigation = useNavigation<any>();
  const handleNavigateToDashboard = () => {
    navigation?.navigate('Dashboard');
  };

  const handleNavigateToMisOperaciones = () => {
    setSearch(null);
    setIsSearch(false);
    navigation?.navigate('Mis operaciones');
  };

  const handleNavigateToMaterials = () => {
    setSearch(null);
    setIsSearch(false);
    navigation?.navigate('Materiales');
  };

  const handleNavigateToPersonalData = () => {
    setSearch(null);
    setIsSearch(false);
    navigation?.navigate('Datos bancarios');
  };
  const handleNavigateToSettings = () => {
    setSearch(null);
    setIsSearch(false);
    navigation?.navigate('Configuraciones');
  };
  const handleLogout = () => {
    setSearch(null);
    setIsSearch(false);
    handleItemPressIn('dashboard_1');
    logOut();
  };
  const handleNavigateToDepartments = () => {
    setSearch(null);
    setIsSearch(false);
    navigation?.navigate('Propiedades');
  };
  return (
    <DrawerContentScrollView>
      <View style={styles.containerImage}>
        <Image source={require('../../assets/mica.png')} />
      </View>
      <ButtonPressable
        onPress={handleNavigateToDashboard}
        handlePressIn={() => handleItemPressIn('dashboard_1')}
        isPressed={
          isItemPressed('dashboard_1') || pressedItems[0] === 'dashboard_1'
        }
        text="Dashboard"
        icon="people-outline"
      />
      <ButtonPressable
        onPress={handleNavigateToMaterials}
        handlePressIn={() => handleItemPressIn('Materiales')}
        isPressed={
          isItemPressed('Materiales') || pressedItems[0] === 'Materiales'
        }
        text="Materiales"
        icon="newspaper-outline"
      />

      <ButtonPressable
        onPress={handleNavigateToMisOperaciones}
        handlePressIn={() => handleItemPressIn('misOperaciones')}
        isPressed={
          isItemPressed('misOperaciones') ||
          pressedItems[0] === 'misOperaciones'
        }
        text="Mis operaciones"
        icon="analytics-outline"
      />

      <ButtonPressable
        onPress={handleNavigateToPersonalData}
        handlePressIn={() => handleItemPressIn('personalData')}
        isPressed={
          isItemPressed('personalData') || pressedItems[0] === 'personalData'
        }
        text="Datos bancarios"
        icon="server-outline"
      />
      <ButtonPressable
        onPress={handleNavigateToDepartments}
        handlePressIn={() => handleItemPressIn('deparments')}
        isPressed={
          isItemPressed('deparments') || pressedItems[0] === 'deparments'
        }
        text="Propiedades"
        icon="business-outline"
      />
      <ButtonPressable
        onPress={handleNavigateToSettings}
        handlePressIn={() => handleItemPressIn('settings')}
        isPressed={isItemPressed('settings') || pressedItems[0] === 'settings'}
        text="Configuraciones"
        icon="settings-outline"
      />

      <ButtonPressable
        onPress={handleNavigateToPersonalData}
        handlePressIn={handleLogout}
        isPressed={isItemPressed([])}
        text="Cerrar sesión"
        icon="log-out-outline"
      />
    </DrawerContentScrollView>
  );
};
export default Sidebar;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    flexDirection: 'row',
    marginBottom: 20,
    paddingLeft: 25,
    height: 54,
  },
  containerImage: {
    marginTop: 30,
    marginBottom: 50,
    display: 'flex',
    alignItems: 'center',
  },
  text: {
    marginLeft: 10,
    fontSize: 17,
    color: GRAY_COLORS.gray500,
    fontWeight: '600',
  },
  pressablePressed: {
    backgroundColor: COLOR_OPACITY.green10,
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
    marginRight: 20,
  },
  pressableTextPressed: {
    color: COLORS.primaryGreen,
  },
});
