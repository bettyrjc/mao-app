import React from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import CurrencyInput from 'react-native-currency-input';
import {COLORS, GRAY_COLORS} from '../../constants';
type CurrencyInputType = {
  value: any;
  onChangeText: (value: number) => void;
  placeholder: string;
  label: string;
  error?: string | any;
  disabled?: boolean;
  loading?: boolean;
  defaultValue?: any;
  onBlur?: () => void;
  ignoreNegative?: boolean;
};
const CurrencyInputField = ({
  value,
  onChangeText,
  placeholder,
  label,
  error,
  disabled,
  loading,
  defaultValue,
  onBlur,
}: CurrencyInputType) => {
  const borderColor = !error ? GRAY_COLORS.gray300 : COLORS.danger;
  const textColor = GRAY_COLORS.gray800; //!error ? : COLORS.danger;
  const changeColor = disabled || loading;
  const styles = StyleSheet.create({
    borderFull: {
      borderWidth: 1,
      borderColor: changeColor ? GRAY_COLORS.gray200 : borderColor,
      borderRadius: 6,
    },

    inputBase: {
      paddingLeft: 10,
      paddingTop: Platform.OS === 'ios' ? 14 : 0,
      paddingBottom: Platform.OS === 'ios' ? 14 : 2,
      backgroundColor: changeColor ? GRAY_COLORS.gray100 : 'transparent',
      marginBottom: 6,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      color: GRAY_COLORS.gray900,
    },
    label: {
      color: textColor,
      fontSize: 14,
      paddingLeft: 4,
      marginBottom: 2,
    },
    errorMessage: {
      fontSize: 14,
      paddingLeft: 4,
      color: COLORS.danger,
      marginBottom: 8,
    },
    inputText: {
      marginLeft: 0,
      width: '80%',
    },
  });

  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputBase, styles.borderFull]}>
        <CurrencyInput
          // ignoreNegative={true}
          showPositiveSign={false}
          value={value}
          onChangeValue={onChangeText}
          placeholder={placeholder}
          delimiter=","
          separator="."
          precision={2}
          placeholderTextColor="#999999"
          style={styles.inputText}
          defaultValue={defaultValue}
          onBlur={onBlur}
        />
      </View>
      {error && <Text style={styles.errorMessage}>{error}</Text>}
    </View>
  );
};
export default CurrencyInputField;
