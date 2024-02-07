import React from 'react';
import {SearchBar} from '@rneui/themed';
import {View, StyleSheet, Pressable} from 'react-native';
import {COLORS, COLOR_OPACITY} from '../../constants';
import {useSearchContext} from '../../context/SearchContext';
import Icon from 'react-native-vector-icons/Ionicons';

type SearchBarComponentProps = {};

const SearchIcon = ({handleSearch}: any) => {
  return (
    <Pressable onPress={handleSearch}>
      <Icon name="search" size={20} color={COLORS.white} />
    </Pressable>
  );
};
const SearchBarComponent: React.FunctionComponent<
  SearchBarComponentProps
> = () => {
  const {search, updateSearch, handleSearch, clearInput} = useSearchContext();

  return (
    <View>
      <SearchBar
        searchIcon={<SearchIcon handleSearch={handleSearch} />}
        clearIcon={
          search && (
            <Pressable onPress={clearInput}>
              <Icon name="close-outline" size={20} color={COLORS.white} />
            </Pressable>
          )
        }
        placeholderTextColor={COLORS.white}
        placeholder="Buscar..."
        onChangeText={updateSearch}
        value={search}
        lightTheme
        containerStyle={styles.container}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.input}
        keyboardType="web-search"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR_OPACITY.grayLight,
    borderRadius: 100,
    paddingVertical: 0,
    borderWidth: 1,
    borderColor: COLORS.white,
    color: COLORS.white,
  },
  icon: {
    color: COLORS.white,
  },
  inputContainer: {
    border: 'none',
    backgroundColor: 'transparent',
    color: COLORS.white,
    height: 35,
  },
  input: {
    border: 'none',
    color: COLORS.white,
  },
});

export default SearchBarComponent;
