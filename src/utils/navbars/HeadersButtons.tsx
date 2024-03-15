import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import Icon from 'react-native-vector-icons/Ionicons';
const CustomHeaderButton = (props: any) => {
  return <HeaderButton {...props} IconComponent={<Icon name="menu" />} iconSize={23} color="white" />;
};

export default CustomHeaderButton;
