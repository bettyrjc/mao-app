/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps, ActivityIndicator, View } from 'react-native';
import { COLORS, COLOR_OPACITY, GRAY_COLORS } from '../../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import { globalThemes } from '../../themes/GlobalThemes';
import { buttonStyles } from '../../themes/ButtonsThemes';

interface OutlinedButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  backgroundColor?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  isFulled?: boolean;
  iconName?: string;
  isFullRounded?: boolean;
  color?: string;
  width?: number;
  weight?: '700' | 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '800' | '900' | undefined;
}

const OutlinedButton: React.FC<OutlinedButtonProps> = ({
  title,
  onPress,
  backgroundColor = COLORS.primary,
  color = COLOR_OPACITY.green10,
  isLoading = false,
  isDisabled = false,
  isFulled = true,
  isFullRounded = false,
  iconName = '',
  width = 150,
  weight,
  ...rest
}) => {
  const textColor = isLoading || isDisabled ? GRAY_COLORS.gray300 : backgroundColor;
  const bgColor = color;

  return (
    <TouchableOpacity
      style={{
        ...buttonStyles.button,
        borderColor: textColor,
        borderWidth: 2,
        borderRadius: isFullRounded ? 100 : 8,
        width: isFulled ? '100%' : width,
        backgroundColor: bgColor,
      }}
      onPress={onPress}
      {...rest}
      activeOpacity={0.8}
      disabled={isLoading || isDisabled}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={textColor} />
      ) : (
        <View style={globalThemes.flexBetween}>
          {iconName && <Icon name={iconName} size={19} color={textColor} />}
          <Text
            style={{
              ...buttonStyles.text,
              color: textColor,
              fontWeight: weight || '700',
              marginLeft: iconName ? 10 : 0,
            }}
          >
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default OutlinedButton;
