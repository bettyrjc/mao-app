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

interface TextButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  textColor?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  isFulled?: boolean;
  colorBg?: string;
  iconName?: string;
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

const TextButton: React.FC<TextButtonProps> = ({
  title,
  onPress,
  textColor = COLORS.primaryPurple,
  isLoading = false,
  isDisabled = false,
  isFulled = true,
  iconName,
  weight,
  ...rest
}) => {
  const color = (isLoading || isDisabled) && GRAY_COLORS.gray200;

  return (
    <TouchableOpacity
      style={{
        ...buttonStyles.button,
        width: isFulled ? '100%' : 150,
        backgroundColor: color || GRAY_COLORS.gray100,
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
              fontWeight: weight || '700',
            }}>
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default TextButton;
