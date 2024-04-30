import { StyleSheet } from 'react-native';
import { COLORS } from '../../utils/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  mainContent: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  menuContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '78%',
    backgroundColor: '#c2e5f7',
    borderColor: '#3F7FCD',

    borderRightWidth: 1,

    alignItems: 'center',
    alignContent: 'center',
  },
  crossIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 23,
    height: 28,
  },
  profileContainer: {
    top: 10,
    marginBottom: 20,
    alignItems: 'center',
    alignContent: 'center',
    borderWidth: 1,
    borderRadius: 100,
    width: 126,
    height: 126,
  },
  profileIcon: {
    alignItems: 'center',
    alignContent: 'center',
    width: 104,
    height: 104,
    borderRadius: 100,
    margin: 8,
    shadowColor: '#007B81',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  profileImageWrapper: {
    alignItems: 'center',
    alignContent: 'center',
    width: 104,
    height: 104,
    borderRadius: 100,
    shadowColor: '#007B81',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },

  titleContainer: {
    alignItems: 'center',
    alignContent: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 17,
    alignItems: 'center',
    alignContent: 'center',
    fontFamily: 'Poppins-Regular',
    color: '#00484B',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#3F7FCD',
    paddingTop: 7,
    paddingBottom: 7,
  },
  icon: {
    width: 22,
    height: 22,
    marginRight: 10,
    marginLeft: 10,
  },
  arrowicon: {
    width: 12,
    height: 18,
    marginRight: 10,
    marginLeft: 10,
  },
  text: {
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    flex: 1,
    marginLeft: 10,
    color: COLORS.contentPrimaryColor
  },
  blurContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  absolute: {
    flex: 1,
  },
  previousScreen: {

  }
});
