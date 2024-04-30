import { StyleSheet, Dimensions, Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS } from '../../utils/Colors';
import { FONTS } from '../../utils/Fonts';

// Headers styles
const headerStyles = StyleSheet.create({
  carouselContainer: {
    position: 'relative',
    backgroundColor: COLORS.primaryBgColor,
    borderRadius: 12,
    marginHorizontal: 16,
    paddingBottom: 4,
    marginTop: 22,
    elevation: 4
  },
  headingContainer: {
    alignContent: 'center',
    alignItems: 'center',
    elevation: 6
  },
  heading: {
    fontSize: 26,
    fontFamily: FONTS.poppinsSemiBold,
    color: COLORS.black,
  },
});

// Carousel styles
const SCREEN_WIDTH = Dimensions.get('window').width;

const carouselstyles = StyleSheet.create({
  carouselContainer: {
    borderRadius: 20,
  },
  carouselItemContainer: {
    height: 145,
    position: 'relative',
    marginHorizontal: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    elevation: 2,
    overflow: 'hidden',
  },
  carouselItemImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 14,
  },
  carouselItemTitleContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderRadius: 12,
  },
  carouselItemTitle: {
    color: COLORS.white,
    fontSize: 22,
    fontFamily: FONTS.poppinsSemiBold,
    ...(Platform.OS === 'ios' && { paddingBottom: 5 }),
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationDot: {
    marginTop: 6,
    width: 6,
    height: 6,
    borderRadius: 8,
    marginHorizontal: 6,
    borderColor: COLORS.black,
    borderWidth: 1,
    backgroundColor: COLORS.white,
  },
  paginationDotActive: {
    backgroundColor: COLORS.black,
  },
});

export {
  carouselstyles,
  SCREEN_WIDTH,
  headerStyles,
};
