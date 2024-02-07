/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {View, Text, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Tooltip from 'react-native-walkthrough-tooltip';
import {COLORS, GRAY_COLORS} from '../../constants';
type TooltipTypes = {
  label?: string | any;
  bgColor?: string;
  placement: 'center' | 'top' | 'bottom' | 'left' | 'right' | undefined;
  iconName?: string;
  labelColor?: string;
  isClosing?: boolean;
  iconColor?: string;
  iconSize?: number;
};
const Tooltips = ({
  label = '10 digitos',
  bgColor = COLORS.info,
  placement,
  iconName = 'information-circle',
  labelColor = COLORS.white,
  isClosing,
  iconColor = GRAY_COLORS.gray600,
  iconSize = 25,
}: TooltipTypes) => {
  const [tooltipVisible, setTooltipVisible] = React.useState(false);

  const handleTooltip = () => {
    setTooltipVisible(!tooltipVisible);
  };
  useEffect(() => {
    if (isClosing) {
      setTooltipVisible(false);
    }
    return;
  }, [isClosing]);

  return (
    <View style={{alignItems: 'center', marginRight: 10}}>
      <Tooltip
        isVisible={tooltipVisible}
        contentStyle={{backgroundColor: bgColor}}
        content={
          <View>
            <Text style={{color: labelColor}}>{label}</Text>
          </View>
        }
        placement={placement}
        backgroundColor="transparent"
        onClose={handleTooltip}>
        <Pressable onPress={handleTooltip}>
          <Icon name={iconName} size={iconSize} color={iconColor} />
        </Pressable>
      </Tooltip>
    </View>
  );
};

export default Tooltips;
