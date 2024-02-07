import React from 'react';
import InputText from './InputText';
type PasswordInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  error: any;
  isBorderFull?: boolean;
  label?: string;
};
const PasswordInput = ({
  value,
  onChangeText,
  error,
  isBorderFull = false,
  label = 'Contraseña',
}: PasswordInputProps) => {
  const [isShowing, setIsShowing] = React.useState(true);
  const handlePressPassword = () => {
    setIsShowing(!isShowing);
  };
  return (
    <InputText
      value={value}
      onChangeText={onChangeText}
      error={error}
      placeholder="*****"
      nameIcon="lock-closed-outline"
      label={label}
      isBorderFull={isBorderFull}
      sizeIcon={20}
      secureTextEntry={isShowing}
      endIconPress={handlePressPassword}
      endIconName={isShowing ? 'eye-off-outline' : 'eye-outline'}
      sizeEndIcon={20}
    />
  );
};

export default PasswordInput;
