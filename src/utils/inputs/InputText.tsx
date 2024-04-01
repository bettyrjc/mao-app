/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { COLORS, GRAY_COLORS } from '../../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import Tooltips from '../common/Tooltips';
// import Tooltips from '../utils/common/Tooltips';

type KeyboardType =
  | 'default'
  | 'numeric'
  | 'email-address'
  | 'phone-pad'
  | 'number-pad'
  | 'url'
  | 'ascii-capable'
  | 'decimal-pad';

type autoCapitalize = 'none' | 'sentences' | 'words' | 'characters' | undefined;

type InputTextProps = {
  keyboardType?: KeyboardType;
  placeholder: string;
  underlineColorAndroid?: string;
  autoCorrect?: boolean;
  autoCapitalize?: autoCapitalize;
  value: string;
  onChangeText?: (value: string) => void;
  selectionColor?: string;
  error?: any;
  label?: string;
  disabled?: boolean;
  loading?: boolean;
  secureTextEntry?: boolean;
  isBorderFull?: boolean;
  nameIcon?: string;
  sizeIcon?: number;
  endIconPress?: () => void;
  endIconName?: string;
  sizeEndIcon?: number;
  stylesInput?: any;
  onFocus?: () => void;
  onBlur?: () => void;
  autoFocus?: boolean;
  ref?: any;
  onSubmitEditing?: any;
  isTooltip?: boolean;
  tooltipText?: string;
  maxLength?: number;
  backgroundColor?: string;
};
const InputText = ({
  keyboardType = 'default',
  placeholder,
  underlineColorAndroid,
  autoCorrect = false,
  autoCapitalize = 'none',
  value,
  onChangeText,
  selectionColor = 'gray',
  error,
  label,
  disabled,
  loading,
  secureTextEntry,
  isBorderFull = true,
  nameIcon = '',
  sizeIcon,
  endIconPress,
  endIconName,
  sizeEndIcon,
  stylesInput,
  onFocus,
  onBlur,
  autoFocus,
  onSubmitEditing,
  isTooltip,
  tooltipText,
  maxLength,
  backgroundColor,
}: InputTextProps) => {
  const borderColor = !error ? GRAY_COLORS.gray300 : COLORS.danger;
  const textColor = GRAY_COLORS.gray800; //!error ? : COLORS.danger;
  const changeColor = disabled || loading;
  const styles = StyleSheet.create({
    borderFull: {
      borderWidth: 1,
      borderColor: changeColor ? GRAY_COLORS.gray200 : borderColor,
      borderRadius: 6,
    },
    borderBottom: {
      borderBottomWidth: 1,
      borderBottomColor: changeColor ? GRAY_COLORS.gray100 : borderColor,
    },
    inputBase: {
      paddingLeft: nameIcon ? 4 : 10,
      paddingTop: Platform.OS === 'ios' ? 14 : 0,
      paddingBottom: Platform.OS === 'ios' ? 14 : 2,
      backgroundColor: backgroundColor ? backgroundColor : changeColor ? GRAY_COLORS.gray100 : 'transparent',
      marginBottom: 6,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: isTooltip ? 'space-between' : 'flex-start',
    },
    label: {
      color: textColor,
      fontSize: 18,
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
      marginLeft: nameIcon ? 10 : 0,
      width: '80%',
      color: GRAY_COLORS.gray900,
    },
  });

  return (
    <>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[stylesInput, styles.inputBase, isBorderFull ? styles.borderFull : styles.borderBottom]}>
        {nameIcon && (
          <View style={{ paddingLeft: 4 }}>
            <Icon name={nameIcon} size={sizeIcon} color={GRAY_COLORS.gray500} />
          </View>
        )}

        <TextInput
          placeholder={placeholder}
          keyboardType={keyboardType}
          underlineColorAndroid={underlineColorAndroid}
          selectionColor={selectionColor}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          onChangeText={onChangeText}
          style={styles.inputText}
          value={value}
          secureTextEntry={secureTextEntry}
          onFocus={onFocus}
          onBlur={onBlur}
          autoFocus={autoFocus}
          placeholderTextColor="#999999"
          editable={disabled}
          onSubmitEditing={onSubmitEditing}
          maxLength={maxLength}
        />

        {endIconName && (
          <Pressable onPress={endIconPress}>
            <Icon name={endIconName} size={sizeEndIcon} color={GRAY_COLORS.gray500} />
          </Pressable>
        )}
        {isTooltip && <Tooltips placement="bottom" label={tooltipText} />}
      </View>
      {error && <Text style={styles.errorMessage}>{error}</Text>}
    </>
  );
};

export default InputText;
