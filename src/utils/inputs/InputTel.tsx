import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Text,
  Platform,
} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import {COLORS, GRAY_COLORS} from '../../constants';

type Country = any;
type InputTelTypes = {
  value?: string;
  onChangeFormattedText?: (value: string) => void;
  onChangeText?: (value: string) => void;
  disabled?: boolean;
  ref?: any;
  error?: any;
  loading?: boolean;
  label?: string;
  backgroundColor?: string;
  placeholder: string;
  isBorderFull?: boolean;
  onChangeCountry?: (value: Country) => void;
};
const InputTel = ({
  value,
  onChangeFormattedText,
  onChangeText,
  disabled,
  ref,
  error,
  loading,
  label = 'Número de teléfono',
  backgroundColor,
  placeholder = '999 9999 9999',
  isBorderFull = true,
  onChangeCountry,
}: InputTelTypes) => {
  const borderColor = !error ? GRAY_COLORS.gray300 : COLORS.danger;
  const textColor = GRAY_COLORS.gray800; //!error ? : COLORS.danger;
  const changeColor = disabled || loading;
  const styles = StyleSheet.create({
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
    borderFull: {
      borderWidth: 1,
      borderColor: changeColor ? GRAY_COLORS.gray200 : borderColor,
      borderRadius: 6,
    },
    borderBottom: {
      borderBottomWidth: 1,
      borderBottomColor: changeColor ? GRAY_COLORS.gray100 : borderColor,
    },
    inputContainer: {
      backgroundColor: backgroundColor
        ? backgroundColor
        : changeColor
        ? GRAY_COLORS.gray100
        : 'transparent',
      width: '100%',
      paddingTop: Platform.OS === 'ios' ? 1 : 1,
      paddingBottom: Platform.OS === 'ios' ? 1 : 1,
    },
    inputTextContainer: {
      backgroundColor: 'transparent',
      borderRadius: 10,
      paddingTop: Platform.OS === 'ios' ? 12 : 1,
      paddingBottom: Platform.OS === 'ios' ? 12 : 1,
    },
  });
  return (
    <>
      <StatusBar />
      <Text style={styles.label}>{label}</Text>
      <SafeAreaView>
        <PhoneInput
          ref={ref}
          defaultValue={value}
          defaultCode="MX"
          layout="first"
          onChangeText={onChangeText}
          placeholder={placeholder}
          onChangeFormattedText={onChangeFormattedText}
          onChangeCountry={onChangeCountry}
          disabled={disabled}
          disableArrowIcon={disabled}
          containerStyle={[
            styles.inputContainer,
            isBorderFull ? styles.borderFull : styles.borderBottom,
          ]}
          textContainerStyle={styles.inputTextContainer}
        />
      </SafeAreaView>
      {error && <Text style={styles.errorMessage}>{error}</Text>}
    </>
  );
};

export default InputTel;
