import { StyleSheet } from 'react-native';
import * as CONST from '../../utils/Constants';
import scale from '../../utils/Scale';
import { FONTS } from '../../utils/Fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CONST.HEADER_COLOR,
  },
  bodyContainer: {
    flex: 1,
    width: '100%',
    justifyContent: CONST.CENTER,
    alignItems: CONST.CENTER,
    backgroundColor: 'white'
  },
  envContainer: {
    flex: 1,
    marginTop: 450,
    alignItems: CONST.CENTER,
    justifyContent: CONST.CENTER,
  },
  envButtonContainer: {
    flexDirection: 'row',
    alignItems: CONST.CENTER,
    justifyContent: CONST.CENTER,
    paddingTop: 30,
    paddingBottom: 20,
  },
  envButton: {
    width: scale(115),
    height: scale(45),
    alignItems: CONST.CENTER,
    justifyContent: CONST.CENTER,
  },
  envText: {
    fontFamily: FONTS.poppinsRegular,
    color: 'black',
  },
  imageStyle: {
    width: scale(250),
    height: scale(250),
    position: CONST.POSITION_ABSOLUTE,
    top: scale(CONST.SCREEN_HEIGHT / 2) - 150,
    alignSelf: CONST.CENTER,
  },
  footerContainer: {
    flex: 1,
    alignItems: CONST.CENTER,
    justifyContent: CONST.CENTER,
    position: CONST.POSITION_ABSOLUTE,
    bottom: 25,
  },
});

export { styles };
