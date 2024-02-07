import React, {useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants';

interface CheckInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onValid?: (valid: boolean) => void;
  color?: string;
}

const CheckInput = ({
  placeholder = 'Introduce un valor',
  value = '',
  onChange = () => {},
  onValid = () => {},
  color = COLORS.primaryPurple,
}: CheckInputProps) => {
  const [isValid, setIsValid] = useState<boolean>(false);

  const handleOnChangeText = (text: string) => {
    onChange(text);
    setIsValid(text !== '');
    onValid(text !== '');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, isValid && styles.inputValid]}
        placeholder={placeholder}
        value={value}
        onChangeText={handleOnChangeText}
      />
      {isValid && <Icon name="checkmark-outline" size={19} color={color} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#ccc',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    marginRight: 8,
    fontSize: 16,
  },
  inputValid: {
    borderColor: 'green',
  },
});

export default CheckInput;
