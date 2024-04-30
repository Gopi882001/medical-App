import { StyleSheet } from "react-native";
import { COLORS } from "../../utils/Colors";
import { FONTS } from "../../utils/Fonts";

const style = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        marginBottom: 22
    },
    safeAreaContainer: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 10,
        backgroundColor: COLORS.bgColor,
        marginTop: 16,
        marginHorizontal: 22,
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
    itemParent: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: COLORS.primaryBgColor,
        marginHorizontal: 22,
        paddingVertical: 12
    },
    item: {
        flexDirection: 'column',
        backgroundColor: COLORS.primaryBgColor,
        paddingStart: 4,
        justifyContent: 'center'
    },
    itemTitle: {
        fontSize: 11,
        fontFamily: FONTS.poppinsSemiBold,
        color: COLORS.contentPrimaryColor
    },
    itemDesc: {
        fontSize: 11,
        fontFamily: FONTS.poppinsRegular,
        color: COLORS.contentPrimaryColor,
        paddingTop: 8,
        paddingEnd: 2,
        width: 180
    },
    itemDate: {
        fontSize: 11,
        fontFamily: FONTS.poppinsRegular,
        color: '#8B8B8B'
    },
    statusContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        marginTop: 10, 
        backgroundColor:'green',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        zIndex: 1, 
      },
      statusText: {
        color: 'white',
        fontSize: 12,
      },
    itemDivider: {
        backgroundColor: '#3F7FCD',
        height: 1,
        marginHorizontal: 22,
    },
    itemIcon: {
        width: 136,
        height: 92,
    },
    titleContainer: {
        backgroundColor: COLORS.primaryBgColor,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        marginHorizontal: 22,
        marginTop: 16
    },
    title: {
        fontSize: 18,
        fontFamily: FONTS.poppinsSemiBold,
        color: COLORS.contentPrimaryColor,
        paddingTop: 12,
        paddingStart: 12,
        paddingEnd: 12
    },
    defaultImage: {
        alignSelf: 'center',
        marginTop: 60,
        backgroundColor: COLORS.primaryBgColor
      },
      imageContainer: {
        flex: 1, 
        backgroundColor: "#FFFFFF", 
        justifyContent: 'center', 
      }
});

export default style;
