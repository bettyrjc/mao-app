/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {COLORS, GRAY_COLORS} from '../../constants';

type HandleInviteTypes = {
  handleInvite?: () => void;
  text: string;
  purpleText?: string;
  image: any;
};
const EmptyContainer = ({
  text,
  purpleText,
  handleInvite,
  image,
}: HandleInviteTypes) => {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Image source={image} />
        <View style={styles.paddingHor}>
          <Text style={styles.textStyle}>{text}</Text>
          <Pressable onPress={handleInvite}>
            <Text
              style={{
                ...styles.textStyle,
                color: COLORS.primaryPurple,
                marginTop: 2,
              }}>
              {purpleText}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: 'transparent',
    zIndex: 100,
    paddingTop: 20,
    height: '100%',
    alignItems: 'center',
    display: 'flex',
  },
  box: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
  },
  textStyle: {
    fontSize: 20,
    fontWeight: '300',
    textAlign: 'center',
    color: GRAY_COLORS.gray900,
  },
  paddingHor: {
    paddingHorizontal: 10,
  },
});
export default EmptyContainer;
