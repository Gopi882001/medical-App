import { StyleSheet, Dimensions, Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS } from '../../utils/Colors';
import { FONTS } from '../../utils/Fonts';

// Carousel styles
const SCREEN_WIDTH = Dimensions.get('window').width;

const carouselStyles = StyleSheet.create({
  carouselContainer: {
    borderRadius: 6,
  },
  carouselItemContainer: {
    height: hp('19.03%'),
    position: 'relative',
    marginHorizontal: 18,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden'
  },
  carouselItemImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 16,
  },
  carouselItemTitleContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderRadius: 16,
  },
  carouselItemTitle: {
    color: COLORS.white,
    fontSize: 22,
    fontFamily: FONTS.poppinsSemiBold,
  },

  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12
  },

  indicator: {
    width: 6,
    height: 6,
    borderRadius: 5,
    marginHorizontal: 6,
    borderColor: COLORS.black,
    borderWidth: 1,
  },

  indicatorActive: {
    backgroundColor: 'rgba(0, 0, 0, 1)',
  },

});

// Phone directory tabs styles
const tabsStyle = StyleSheet.create({
  container: {
    marginTop: 10,
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    paddingRight: 8,
    paddingStart: 0,
    marginEnd: 20,
    height: 22,
    borderRadius: 12,
  },
  topHeader: {
    flexGrow: 1,
    height: 36,
    marginStart: 16,
    marginEnd: 15,
    borderTopRightRadius: 8,
    backgroundColor: COLORS.primaryBgColor
  },
  phoneDirectoryContainer: {
    marginTop: 20,
    width: 180,
    textAlign: 'center',
    paddingTop: 2,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginLeft: 16,
    backgroundColor: COLORS.primaryBgColor
  },
  phoneDirectoryText: {
    width: 180,
    textAlign: 'center',
    fontSize: 17,
    fontFamily: FONTS.poppinsSemiBold,
    color: COLORS.black,
    paddingTop: 2,
  },
  titleContainer: {
    flexWrap: 'wrap',
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
    borderRadius: 10,
    backgroundColor: COLORS.transparent,
    marginRight: 1,
    alignContent: 'center',
  },
  selectedTitleContainer: {
    paddingHorizontal: 12,
    flexWrap: 'wrap',
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.secondaryBgColor,
    borderRadius: 12,
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
    right: 20,
    bottom: 2,
    height: Platform.OS === 'ios' ? 22 : 26,
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
    backgroundColor: COLORS.transparent,
    marginBottom: Platform.OS === 'ios' ? 2 : 0,
  },
  arrowBg: {
    marginRight: 12,
    height: Platform.OS === 'ios' ? 23 : 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 14,
    borderBottomRightRadius: 14,
  },
  arrowIcon: {
    color: COLORS.black,
  },
});

// Flat list style
const phoneDirectoryStyles = StyleSheet.create({
  container: {
    paddingTop: 6,
    marginBottom: 8,
    backgroundColor: COLORS.primaryBgColor,
    marginLeft: 16,
    marginRight: 16,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8
  },
  title: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 2,
    textAlign: 'center',
    alignContent: 'center',
    fontSize: 12,
    fontFamily: FONTS.poppinsMedium,
    marginTop: 8,
    padding: 2,
    color: COLORS.black
  },
  itemContainer: {
    flexDirection: 'column',
    alignContent: 'space-between',
    alignItems: 'center',
    paddingTop: 6,
    width: 80,
    marginHorizontal: 6,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    color: COLORS.black,
    elevation: 2,
    marginBottom: 6
  },
  image: {
    alignContent: 'center',
    width: 62,
    height: 58,
    paddingTop: 2,
    borderRadius: 36,
    borderTopLeftRadius: 36,
    borderBottomLeftRadius: 36,
    right: 0.5
  },
});

// Grid for POW: post of the week style
const postOfTheWeekStyles = StyleSheet.create({
  heading: {
    width: 180,
    textAlign: 'center',
    fontSize: 17,
    fontFamily: FONTS.poppinsSemiBold,
    color: COLORS.black,
    paddingTop: 2,
    paddingHorizontal: 10,
    paddingVertical: 4,

  },
  Header: {
    flexGrow: 1,
    marginStart: 16,
    marginEnd: 20
  },
  headingContainer: {
    marginTop: 16,
    width: 180,
    textAlign: 'center',
    paddingTop: 2,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginLeft: 16,
    backgroundColor: COLORS.primaryBgColor

  },
  itemsContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: 'blue',
    borderRadius: 8,
    overflow: 'visible'
  },
  itemContainer: {
    marginRight: 6,
  },
  item: {
    width: 150,
    height: 110,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 140,
    height: 100,
    resizeMode: 'stretch',
    borderRadius: 8,
  },
  titleContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  title: {
    color: COLORS.white,
    fontSize: 14,
    fontFamily: FONTS.poppinsMedium,
    textAlign: 'center',
  },
  arrowContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: 100,
    justifyContent: 'center',
    alignItems: "flex-end",
    width: 20,
    backgroundColor: COLORS.transparent,
    marginTop: 55,
  },
});

// Gridview style
const gridStyles = StyleSheet.create({

  gridContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBgColor,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
    marginRight: 16,
    marginTop: 12,
    paddingVertical: 4
  },
  gridItemContainer: {
    width: 162,
    height: 150,
    margin: 4
  },
  gridItem: {
    flex: 1,
    backgroundColor: COLORS.primaryBgColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 162,
    height: 150,
    borderRadius: 8,
  },
  titleContainer: {
    position: 'absolute',
    bottom: 0,
    borderRadius: 12,
    width: 162,
  },
  title: {
    color: COLORS.white,
    fontFamily: FONTS.poppinsMedium,
    fontSize: 14,
    textAlign: 'center',
    padding: 6,
  },
});

export {
  carouselStyles,
  SCREEN_WIDTH,
  gridStyles,
  postOfTheWeekStyles,
  phoneDirectoryStyles,
  tabsStyle,
};
