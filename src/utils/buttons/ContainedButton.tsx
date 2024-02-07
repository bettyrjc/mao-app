/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  TouchableOpacity,
  Text,
  TouchableOpacityProps,
  ActivityIndicator,
  View,
} from 'react-native';
import {COLORS, GRAY_COLORS} from '../../constants';
import {globalThemes} from '../../themes/GlobalThemes';
import Icon from 'react-native-vector-icons/Ionicons';
import {buttonStyles} from '../../themes/ButtonsThemes';

interface ContainedButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  backgroundColor?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  isFulled?: boolean;
  textColor?: string;
  iconName?: string;
  width?: number | string;
  fontSize?: number;
  weight?:
    | '700'
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '800'
    | '900'
    | undefined;
}

const ContainedButton: React.FC<ContainedButtonProps> = ({
  title,
  onPress,
  backgroundColor = COLORS.primaryGreen,
  textColor = COLORS.white,
  isLoading = false,
  isDisabled = false,
  isFulled = true,
  iconName,
  width = 150,
  fontSize,
  weight = '700',
  ...rest
}) => {
  const bgColor =
    isLoading || isDisabled ? GRAY_COLORS.gray300 : backgroundColor;

  return (
    <TouchableOpacity
      style={{
        ...buttonStyles.button,
        backgroundColor: bgColor,
        width: isFulled ? '100%' : width,
      }}
      onPress={onPress}
      {...rest}
      disabled={isLoading || isDisabled}>
      {isLoading ? (
        <ActivityIndicator size="small" color={textColor} />
      ) : (
        <View style={globalThemes.flexBetween}>
          {iconName && <Icon name={iconName} size={19} color={textColor} />}
          <Text
            style={{
              ...buttonStyles.text,
              color: textColor,
              fontWeight: weight,
              fontSize: fontSize || 16,
            }}>
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ContainedButton;
