import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { COLORS, GRAY_COLORS } from '../../constants';
import IconIon from 'react-native-vector-icons/Ionicons';
type SelectInputProps = {
  label?: string;
  options: { label: any; value: any }[];
  selectedValue: string;
  placeholder: string;
  onValueChange: (value: string) => void;
  error?: any;
  disabled?: boolean;
  loading?: boolean;
  isBorderFull?: boolean;
  Icon?: React.ReactNode | any;
  isFilteredInput?: boolean;
  isPadding?: boolean;
};
const IconInput = () => <IconIon name="chevron-down-outline" size={20} color={GRAY_COLORS.gray500} />;

const SelectInput = ({
  label,
  options,
  selectedValue,
  onValueChange,
  placeholder,
  error,
  disabled,
  loading,
  isBorderFull,
  Icon = IconInput,
  isFilteredInput,
  isPadding = true,
}: SelectInputProps) => {
  const borderColor = !error ? GRAY_COLORS.gray300 : COLORS.danger;
  const textColor = GRAY_COLORS.gray800; //!error ?  : COLORS.danger;
  const changeColor = disabled || loading;

  const styles = StyleSheet.create({
    container: {
      marginBottom: 16,
      width: isFilteredInput ? 200 : '100%',
    },
    containerInput: {
      position: 'relative',
      paddingLeft: isPadding ? 10 : 0,
    },
    inputFilter: {
      position: 'absolute',
      zIndex: 100,
      top: 10,
      paddingLeft: 10,
    },
    label: {
      color: textColor,
      fontSize: 14,
      paddingLeft: 4,
      marginBottom: 2,
    },

    borderFull: {
      borderWidth: 1,
      borderColor: changeColor ? GRAY_COLORS.gray100 : borderColor,
      borderRadius: 6,
    },
    borderBottom: {
      borderBottomWidth: 1,
      borderBottomColor: changeColor ? GRAY_COLORS.gray100 : borderColor,
    },
    errorMessage: {
      fontSize: 14,
      paddingLeft: 4,
      color: COLORS.danger,
      marginBottom: 8,
    },
  });
  const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 14,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderRadius: 6,
      color: GRAY_COLORS.gray900,
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      paddingLeft: isFilteredInput ? 40 : 0,
      backgroundColor: isFilteredInput ? 'white' : 'transparent',
    },
    inputAndroid: {
      fontSize: 14,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderRadius: 6,
      color: GRAY_COLORS.gray900,
      paddingLeft: isFilteredInput ? 40 : 0,
      backgroundColor: isFilteredInput ? 'white' : 'transparent',
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.containerInput, isBorderFull ? styles.borderFull : styles.borderBottom]}>
        {isFilteredInput && (
          <View style={styles.inputFilter}>
            <IconIon name="funnel" size={18} color={GRAY_COLORS.gray500} />
          </View>
        )}
        <RNPickerSelect
          placeholder={{ label: placeholder, value: null }}
          items={options}
          value={selectedValue}
          onValueChange={onValueChange}
          style={{
            ...pickerSelectStyles,
            iconContainer: {
              top: 10,
              right: 10,
            },
          }}
          useNativeAndroidPickerStyle={false}
          Icon={Icon}
        />
      </View>
      {error && <Text style={styles.errorMessage}>{error}</Text>}
    </View>
  );
};

export default SelectInput;
