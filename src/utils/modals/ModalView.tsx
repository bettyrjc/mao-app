import React from 'react';
import {Modal, StyleSheet, Pressable, View} from 'react-native';
import {COLOR_OPACITY, GRAY_COLORS} from '../../constants';
import Icon from 'react-native-vector-icons/Ionicons';

type ModalViewType = {
  handleModal: () => void;
  modalVisible: boolean;
  children?: any;
  handleCloseModal?: () => void;
};
const ModalView = ({
  modalVisible,
  handleModal,
  children,
  handleCloseModal,
}: ModalViewType) => {
  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={[styles.centeredView]}>
          <View style={[styles.modalView]}>
            <Pressable
              style={styles.button}
              onPress={handleCloseModal || handleModal}>
              <Icon
                name="close-circle-outline"
                size={26}
                color={GRAY_COLORS.gray400}
              />
            </Pressable>
            <View style={[styles.modalView]}>{children}</View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: COLOR_OPACITY.background,
    // position: 'absolute',
    // bottom: 0,
    // left: 0,
    // right: 0,
  },
  modalView: {
    marginBottom: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
    paddingBottom: 2,
    paddingTop: 2,
    width: '100%',
    maxHeight: '95%',
  },

  button: {
    padding: 5,
    paddingBottom: 0,
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ModalView;
