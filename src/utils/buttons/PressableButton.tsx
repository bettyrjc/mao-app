import {View, Text, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import {COLORS, COLOR_OPACITY, GRAY_COLORS} from '../../constants';
import Cards from '../common/Cards';
import Icon from 'react-native-vector-icons/Ionicons';

type PressableButtonType = {
  handleAction: () => void;
  isSelected?: boolean;
  icon: string;
  name: string;
};
const PressableButton = ({
  handleAction,
  isSelected,
  icon,
  name,
}: PressableButtonType) => {
  return (
    <Pressable onPress={handleAction}>
      <Cards bgColor={isSelected ? COLOR_OPACITY.purple : COLORS.white}>
        <View style={styles.container}>
          <Icon
            name={icon}
            size={25}
            color={isSelected ? COLORS.primaryPurple : GRAY_COLORS.gray500}
          />
          <Text
            style={{
              ...styles.text,
              color: isSelected ? COLORS.primaryPurple : GRAY_COLORS.gray900,
            }}>
            {name}
          </Text>
        </View>
      </Cards>
    </Pressable>
  );
};

export default PressableButton;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 15,
    marginTop: 5,
  },
  text: {marginLeft: 10, fontSize: 14, fontWeight: 'bold'},
});
