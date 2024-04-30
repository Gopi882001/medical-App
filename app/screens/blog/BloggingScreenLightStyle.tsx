import { Dimensions, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FONTS } from '../../utils/Fonts';
import { COLORS } from '../../utils/Colors';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
    marginStart: 20,
    backgroundColor: 'white',
    width: deviceWidth - 40,
    height: deviceHeight,
    marginBottom: 20,
  },
  translateIcon: {
    width: 27,
    height: 28.3,
    marginLeft: 'auto',
    marginBottom: hp('0.75%'),
  },
  bannerImage: {
    margin: wp('3.5%'),
    width: wp('93.2%'),
    height: hp('20.8%'),
    borderRadius: wp('2.13%'),
  },
  bannerTextContainer: {
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 16,
    marginBottom: wp('3.5%'),
    width: wp('93.2%'),
    borderBottomLeftRadius: wp('2.13%'),
    borderBottomRightRadius: wp('2.13%'),
    marginLeft: wp('3.5%'),
  },
  bannerText: {
    fontSize: wp('7.5%'),
    color: '#ffffff',
    textAlign: 'center',
    fontFamily: FONTS.poppinsRegular,
  },
  socialMediaIcon: {
    width: wp('15%'),
    height: wp('15%'),
  },
  socialMediaIconContainer: {
    flexDirection: 'row',
    marginLeft: 10,
    width: wp('82%'),
    height: wp('9.5%'),
    marginBottom: 1,
  },
  contentText: {
    paddingHorizontal: 16,
    marginBottom: 6,
  },
  gridheadingText: {
    fontFamily: FONTS.poppinsMedium,
    fontSize: 17,
    color: COLORS.black,
  },
  gridheadingContainer: {
    backgroundColor: '#E8F2FE',
    width: 150,
    padding: 4,
    marginStart: 10,
    paddingStart: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  }
});

const gridStyles = StyleSheet.create({
  container: {},
  gridContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: '#E8F2FE',
    borderTopEndRadius: 8,
    borderBottomStartRadius: 8,
    borderBottomEndRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 10,
  },
  gridItemContainer: {
    marginRight: wp('0%'),
    padding: 8,
    width: 186,
    height: 115,
  },
  gridItem: {
    flex: 1,
    backgroundColor: '#E8F2FE',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderRadius: 6,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 8,
  },
  titleContainer: {
    position: 'absolute',
    bottom: 0,
    borderRadius: 8,
    width: '100%',
  },
  title: {
    color: '#ffffff',
    fontFamily: FONTS.poppinsMedium,
    fontSize: wp('3.2%'),
    textAlign: 'center',
    padding: 8,
  },
});

export { styles, gridStyles };
