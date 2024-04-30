import { StyleSheet, Platform } from 'react-native';
import { COLORS } from '../../utils/Colors';
import { FONTS } from '../../utils/Fonts';

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  scrollView: {
    paddingBottom: 16,
    marginBottom: 16
  },
  profileContainer: {
    marginTop: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImageContainer: {
    width: 220,
    height: 220,
    borderRadius: 120,
    borderWidth: 1,
    borderColor: '#0E7E83',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImageWrapper: {
    borderRadius: 90,
    ...Platform.select({
      ios: {
        shadowColor: '#007B81',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6,
        shadowRadius: 3,
      }
    }),
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 192,
    height: 192,
    borderRadius: 90,
  },
  userName: {
    marginTop: 18,
    fontSize: 17,
    fontFamily: FONTS.poppinsRegular,
    color: COLORS.userNameFontColor,
    marginBottom: 32
  },
  elementsCard: {
    paddingTop: 2,
    flexDirection: 'column',
    backgroundColor: COLORS.primaryBgColor,
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: "#0061D57D",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        elevation: 10,
      }
    })
  },
  itemContainer: {
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center'
  },

  itemLogoutContainer: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    marginBottom: 8
  },

  sectionIcon: {
    width: 26,
    height: 26,
    marginLeft: 20,
    alignItems: 'center'
  },

  sectionIconlogout: {
    width: 22,
    height: 30,
    marginLeft: 24,
  },
  sectionText: {
    flex: 1,
    marginLeft: 16,
    padding: 2,
    fontFamily: FONTS.poppinsLight,
    fontSize: 14,
    color: COLORS.black,
  },
  arrowIcon: {
    width: 12,
    height: 18,
    marginRight: 48,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.barColor,
    marginVertical: 6,
  },

  switch: {
    backgroundColor: COLORS.transparent,
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'flex-end',
    marginRight: 32,
  },
});

export default styles;
