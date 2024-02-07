/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Platform, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ContainedButton from '../buttons/ContainedButton';
import {COLORS} from '../../constants';

type WelcomeModalType = {
  handleInviteModal: () => void;
};

const WelcomeModal = ({handleInviteModal}: WelcomeModalType) => {
  return (
    <View
      style={{
        paddingHorizontal: 2,
        paddingBottom: 30,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
      }}>
      <Icon name="checkmark-circle" size={130} color={COLORS.success} />
      <Text
        style={{
          fontSize: Platform.OS === 'ios' ? 18 : 16,
          fontWeight: 'bold',
          marginTop: 10,
          marginBottom: 10,
        }}>
        🎉¡Nos alegra mucho que estés acá!🎉
      </Text>
      <Text style={{fontSize: Platform.OS === 'ios' ? 14 : 12, marginTop: 5}}>
        Trabajaremos de la mano y sabemos que juntos haremos grandes cosas. El
        siguiente paso es invitar a tus prospectos
      </Text>

      <View style={{marginTop: 20, width: '100%'}}>
        <ContainedButton
          title="Invitar"
          onPress={handleInviteModal}
          fontSize={18}
          isFulled={false}
          width="100%"
          textColor={COLORS.white}
        />
      </View>
    </View>
  );
};

export default WelcomeModal;
