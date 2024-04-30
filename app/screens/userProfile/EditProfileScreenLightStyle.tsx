import { StyleSheet, Platform } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { COLORS } from '../../utils/Colors';
import { FONTS } from '../../utils/Fonts';

const styles = StyleSheet.create({

  profileContainer: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center'
  },
  profileImageContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 1,
    borderColor: COLORS.profileBorderColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileAdd: {
    width: 170,
    height: 140,
  },
  profileImageWrapper: {
    borderRadius: 100,
    shadowColor: COLORS.profileShadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 132,
    height: 132,
    borderRadius: 60,
  },
  add: {
    width: 36,
    height: 36,
    position: 'absolute',
    bottom: 2,
    right: 4,
  },
  userName: {
    marginTop: 32,
    fontSize: 17,
    fontFamily: FONTS.poppinsRegular,
    color: COLORS.userNameFontColor,
  },
  elementsCard: {
    marginHorizontal: 26,
    marginTop: 20,
    backgroundColor: COLORS.primaryBgColor,
    borderRadius: 8,
    paddingBottom: 4
  },
  sectionInput: {
    height: Platform.OS === 'ios' ? 36 : 32,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
    marginBottom: 12,
    backgroundColor: COLORS.white,
    fontFamily: FONTS.poppinsMedium,
    fontSize: 14,
    borderRadius: 8,
    padding: 4,
  },
  cardTitle: {
    marginLeft: 10,
    fontFamily: FONTS.poppinsSemiBold,
    fontSize: 14,
    marginVertical: 6,
    paddingVertical: 4,
    color: COLORS.black,
  },
  updateText: {
    color: COLORS.white,
    alignSelf: 'center',
    alignContent: 'center',
    fontFamily: FONTS.poppinsRegular,
    fontSize: 20,
    marginVertical: 1,
    alignItems: 'center'
  },
  updateButton: {
    alignSelf: 'center',
    justifyContent: 'center',
    height: 44,
    width: 240,
    marginTop: 28,
    backgroundColor: COLORS.barColor,
    borderRadius: 6,
    marginBottom: 16
  },
  deleteicon: {
    width: 35,
    height: 40,
    position: 'relative',
    left: 28,
    bottom: 10
  },
  invalidInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
  validationMessage: {
    color: 'red',
    fontSize: 12,
    marginStart: 16,
    marginBottom: 6,
  },
});

export default styles;
