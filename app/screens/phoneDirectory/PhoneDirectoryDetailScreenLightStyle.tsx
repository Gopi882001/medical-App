import { Platform, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS } from '../../utils/Colors';
import { FONTS } from '../../utils/Fonts';
import { Dimensions } from 'react-native';

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    backgroundColor: COLORS.bgColor,
    marginTop: 16,
    marginStart: 22,
    height: 44
  },
  input: {
    paddingStart: 8,
    flex: 1,
    fontSize: 16,
    width: 180,
    color: 'black',
  },
  searchIcon: {
    position: 'relative',
    top: 0,
    start: 0,
    marginLeft: 6,
    marginEnd: 16,
    width: 28,
    height: 30,
    tintColor: COLORS.secondaryBgColor,
  },
});
const phnbarstyles = StyleSheet.create({
  totalContainer: {
    backgroundColor: COLORS.primaryBgColor,
    marginLeft: 22,
    marginRight: 16,
    marginTop: 16,
    borderRadius: 12,

  },
  container: {
    flexDirection: 'row',
    height: 24,
  },
  headingContainer: {
    paddingTop: 12,
    fontSize: 25,
    fontFamily: FONTS.poppinsSemiBold,
    marginStart: 22,
    color: COLORS.black,
  },
  titleContainer: {
    width: 100,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
    borderRadius: 12,
    backgroundColor: 'transparent',
    marginRight: 1,
    alignContent: 'center',
  },
  selectedTitleContainer: {
    width: 120,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.secondaryBgColor,
    borderRadius: 10,
    textAlign: 'center',
  },
  titleText: {
    fontFamily: FONTS.poppinsMedium,
    alignContent: 'center',
    color: COLORS.black,
    fontSize: 14,
    alignItems: 'center'
  },
  selectedTitleText: {
    backgroundColor: COLORS.secondaryBgColor,
    borderRadius: 8,
    color: COLORS.white,
    fontFamily: FONTS.poppinsMedium,
    fontSize: 14,
    textAlign: 'center'
  },
  arrowContainer: {
    position: 'absolute',
    top: 'auto',
    right: -14,
    bottom: Platform.OS === 'ios' ? 0 : 2,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
    backgroundColor: COLORS.transparent,
    marginBottom: Platform.OS === 'ios' ? 2 : 0,
  },
  arrowBg: {
    marginRight: 12,
    height: Platform.OS === 'ios' ? 22 : 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 14,
    borderBottomRightRadius: 14,
  },
  arrowIcon: {
    color: COLORS.black,
  },
});
const { width, height } = Dimensions.get('window');
const scaleFactor = width / 375;
const phndirectorystyles = StyleSheet.create({
  container: {
    marginStart: 22,
  },
  title: {
    textAlign: 'center',
    alignContent: 'center',
    fontSize: 12,
    fontFamily: FONTS.poppinsSemiBold,
    marginTop: 10,
    color: COLORS.black,
    paddingEnd: 8
  },
  more: {
    fontSize: 12,
    fontFamily: FONTS.poppinsSemiBold,
    marginTop: 10,
    color: COLORS.black,
    paddingLeft: 16
  },
  itemContainer: {
    width: 70 * scaleFactor,
    height: 100 * scaleFactor,
    marginHorizontal: 8 * scaleFactor,
    marginTop: 16 * scaleFactor,
    marginVertical: 6 * scaleFactor
  },
  imageContainer: {
    alignContent: 'center',
    width: 56,
    height: 58,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 2, borderRadius: 45,
      },
      android: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 6,
        borderRadius: 26,

      },
    }),
  },
  image: {
    alignContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 45
  },
  imageMore: {
    alignContent: 'center',
    width: 61,
    height: 58,
  },
  moreImageContainer: {
    alignContent: 'center',
    width: 61,
    height: 58,
    borderRadius: 30,
    shadowColor: COLORS.white,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 2,
  },
  showAllContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primaryBgColor,
  },
});

export { styles, phnbarstyles, phndirectorystyles };
