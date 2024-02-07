/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

type FilteredButtonType = {
  name: string;
  color: any;
  id?: string;
  selectStatus?: () => void;
  backgroundColor?: any;
};
const FilteredButton = ({
  name,
  color,
  id,
  selectStatus,
  backgroundColor,
}: FilteredButtonType) => {
  return (
    <TouchableOpacity
      key={id}
      onPress={selectStatus}
      style={{
        ...styles.itemsFilter,
        backgroundColor: backgroundColor,
        borderColor: color,
      }}>
      <Text
        style={{
          color: color,
          fontWeight: '600',
          fontSize: 12,
        }}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

export default FilteredButton;
const styles = StyleSheet.create({
  itemsFilter: {
    marginHorizontal: 4,
    borderWidth: 2,
    borderRadius: 30,
    paddingHorizontal: 10,
    // marginBottom: 10,
    paddingVertical: 3,
  },
});
