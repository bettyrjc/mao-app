import {StyleSheet} from 'react-native';
import {GRAY_COLORS} from '../constants';

export const globalThemes = StyleSheet.create({
  body: {
    backgroundColor: GRAY_COLORS.gray100,
    marginTop: 20,
    marginHorizontal: 20,
    color: GRAY_COLORS.gray900,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
    height: 600,
    marginBottom: 50,
  },
  title: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 20,
  },

  flex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  flexCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  flexBetween: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  inputField: {
    color: 'white',
    fontSize: 20,
  },
  inputFieldIos: {
    borderBottomColor: 'white',
    borderBottomWidth: 2,
    paddingBottom: 4,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
});
