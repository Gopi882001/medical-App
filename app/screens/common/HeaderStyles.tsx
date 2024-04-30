import { Platform, StyleSheet } from "react-native";
import { COLORS } from "../../utils/Colors";

const headerStyle = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 4,
        backgroundColor: COLORS.appbarColor,
        paddingHorizontal: 16,
    },
    backButton: {
        width: 19,
        height: 28,
        marginLeft: 'auto'
    },
    appLogo: {
        width: 41,
        height: 41,
    },
    appLogoWithMargin: {
        width: 41,
        height: 41,
        marginEnd: '46%'
    },
    shareIcon: {
        width: 30,
        height: 30,
    },
    menuIcon: {
        width: 32,
        height: 28,
        marginRight: 'auto',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: COLORS.white,
        borderBottomWidth: 1,

    },
    profileIcon: {
        marginLeft: 'auto',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    menuText: {
        fontSize: 16,
    },
    modalContent: {
        width: '95%',
        height: '85%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },

});

export default headerStyle;