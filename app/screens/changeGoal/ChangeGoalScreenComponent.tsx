import React, { useEffect, useState } from "react";
import {
    SafeAreaView,
    View,
    Image,
    Text,
    StyleSheet,
    TextInput,
    Pressable,
} from "react-native";
import { TouchableOpacity, } from 'react-native-gesture-handler';
import { COLORS } from '../../utils/Colors';
import { useNavigation } from "@react-navigation/native";
import styles from '../userProfile/UserProfileScreenLightStyle'
import { FONTS } from "../../utils/Fonts";
import RNPickerSelect from 'react-native-picker-select';
import headerStyle from "../common/HeaderStyles";
import * as CONST from '../../utils/Constants';

const ChangeGoalScreen = (props: any) => {

    const {
        setGoalsData,
        setGoalsError,
    } = props;

    const [age, setAge] = useState('');
    const [goal, setGoal] = useState("");
    const goals = ["Gain", "Muscles", "Yoga", "Weight Loss"];
    const navigation = useNavigation();

    const [darkMode, setDarkMode] = useState(false);

    const onCheckLimit = (value: string) => {
        const updatedValue = Number.parseInt(value)
        if (Number.isNaN(updatedValue)) {
            setAge('0')
        } else if (updatedValue > 100) {
            setAge('100')
        } else {
            setAge(updatedValue.toString())
        }
    }

    useEffect(() => {
        if (setGoalsData && setGoalsData.status === 'success') {
            console.log(setGoalsData.data.status)
        }
    }, [setGoalsData, setGoalsError]);

    const setGoals = () => {
        props.setGoals({
            "user_age": 25,
            "user_goal": "Weight Loss"
        })
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={headerStyle.container}>
                <TouchableOpacity onPress={navigation.goBack}>
                    <Image
                        source={CONST.BACK_ICON}
                        style={headerStyle.backButton} />
                </TouchableOpacity>
                <Pressable>
                    <Image
                        source={CONST.APP_LOGO}
                        style={headerStyle.appLogoWithMargin} />
                </Pressable>
            </View>
            <View style={styles.profileContainer}>
                <View style={styles.profileImageContainer}>
                    <View style={styles.profileImageWrapper}>
                        <Image source={CONST.GRID_ICON} style={styles.profileImage} />
                    </View>
                </View>
                <Text style={styles.userName}>USER NAME</Text>
            </View>
            <View style={style.elementsCard}>
                <Text style={style.cardTitle}>YOUR AGE</Text>
                <TextInput
                    style={[style.sectionInput, { color: darkMode ? '#FFF' : '#000' }]}
                    keyboardType='number-pad'
                    placeholder="00"
                    placeholderTextColor={darkMode ? '#666' : '#999'}
                    returnKeyType='done'
                    value={age}
                    onChangeText={(newValue) => onCheckLimit(newValue)}
                />
            </View>
            <View style={style.elementsCard}>
                <Text style={style.cardTitle}>YOUR GOAL</Text>
                <View style={style.spinnerContainer}>
                    <Image source={require('../../assets/common/picker_background1.png')} style={style.image} />
                    <RNPickerSelect
                        onValueChange={(value) => setGoal(value)}
                        items={[
                            { label: goals[0], value: goals[0] },
                            { label: goals[1], value: goals[1] },
                            { label: goals[2], value: goals[2] },
                            { label: goals[3], value: goals[3] },
                        ]}
                        value={goal}
                        useNativeAndroidPickerStyle={false}
                        style={{
                            inputAndroid: style.pickerInput,
                            inputIOS: style.pickerInput,
                            modalViewMiddle: { justifyContent: 'flex-end' },
                            chevronContainer: { display: 'none' }
                        }}
                    />
                </View>
            </View>
            <TouchableOpacity onPress={() => setGoals()} style={style.updateButton}>
                <Text style={style.updateText}>UPDATE</Text>
            </TouchableOpacity>
        </SafeAreaView >
    );
};

const style = StyleSheet.create({
    yourAge: {
        marginHorizontal: 25,
        backgroundColor: COLORS.primaryBgColor,
        fontFamily: FONTS.poppinsSemiBold,
        fontSize: 14,
        paddingTop: 12,
        paddingBottom: 0,
        color: COLORS.black,
        alignItems: 'center',
        alignContent: 'center',
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        textAlign: 'center'
    },
    textInput: {
        borderWidth: 12,
        marginHorizontal: 25,
        borderColor: COLORS.primaryBgColor,
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
        textAlign: 'center',
        height: 60,
    },
    spinner: {
        alignItems: 'center',
        height: 40,
        justifyContent: 'center'
    },
    elementsCard: {
        marginHorizontal: 26,
        marginTop: 20,
        backgroundColor: COLORS.primaryBgColor,
        borderRadius: 8,
        paddingBottom: 4
    },
    cardTitle: {
        marginLeft: 10,
        fontFamily: FONTS.poppinsSemiBold,
        fontSize: 14,
        marginVertical: 6,
        paddingVertical: 4,
        color: COLORS.black,
        textAlign: 'center'
    },
    sectionInput: {
        textAlign: 'center',
        marginHorizontal: 12,
        backgroundColor: COLORS.white,
        marginBottom: 12,
        borderRadius: 8,
        padding: 2,
        height: 40
    },
    spinnerContainer: {
        textAlign: 'center',
        marginHorizontal: 12,
        backgroundColor: COLORS.white,
        marginBottom: 12,
        borderRadius: 8,
        padding: 4,
        justifyContent: 'center',
        height: 40
    },
    image: {
        width: 275,
        height: 12,
        top: 25,
        left: 18
    },
    updateButton: {
        width: 240,
        height: 44,
        backgroundColor: COLORS.barColor,
        borderRadius: 6,
        alignSelf: 'center',
        marginTop: 36
    },
    updateText: {
        color: COLORS.white,
        textAlign: 'center',
        textAlignVertical: 'center',
        paddingTop: 8,
        fontSize: 20,
        fontFamily: FONTS.poppinsRegular
    },
    pickerInput: {
        textAlign: 'center',
        fontFamily: FONTS.poppinsRegular,
        fontSize: 14,
        color: COLORS.black,
        height: 40,
        bottom: 4
    },
    pickerIcon: {
        top: 10,
        right: 12,
    },
});
export default ChangeGoalScreen;
