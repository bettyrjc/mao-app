import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, GRAY_COLORS} from '../../constants';

interface CheckInputProps {
  label?: any;
  checked?: boolean;
  color?: string;
  onChange: (checked: boolean) => void;
  iconColor?: string;
  error?: any;
}

const CheckInput = ({
  label = '',
  checked = false,
  onChange = () => {},
  color = COLORS.primaryPurple,
  iconColor = COLORS.white,
  error,
}: CheckInputProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(checked);

  const handleOnPress = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    onChange(newChecked);
  };

  return (
    <TouchableOpacity onPress={handleOnPress}>
      <View style={styles.container}>
        <View
          style={[
            styles.checkbox,
            isChecked && {
              backgroundColor: color,
              borderColor: color,
            },
          ]}>
          {isChecked && (
            <Icon name="checkmark-outline" size={15} color={iconColor} />
          )}
        </View>
        <Text style={styles.label}>{label}</Text>
      </View>
      {error && <Text style={styles.errorMsg}>{error}</Text>}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    borderColor: GRAY_COLORS.gray400,
  },
  label: {
    fontSize: 14,
    color: GRAY_COLORS.gray800,
    width: '100%',
    overflowWrap: 'wrap',
    paddingRight: 8,
    marginRight: 8,
  },
  errorMsg: {
    color: COLORS.danger,
    marginTop: 5,
  },
});

export default CheckInput;
