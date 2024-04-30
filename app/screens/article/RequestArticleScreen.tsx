import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, View, Image, TouchableOpacity, Text, Pressable, TextInput, ImageBackground } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../utils/Colors";
import { StyleSheet } from "react-native";
import { FONTS } from "../../utils/Fonts";
import headerStyle from "../common/HeaderStyles";
import * as CONST from "../../utils/Constants";
import { Platform } from "react-native";
import * as AppConfig from "../../utils/AppConfig";
import { Dropdown } from 'react-native-element-dropdown';

const RequestedArticleScreen = (props: any) => {

    const {
        requestArticleData,
        requestArticleError,
        updateRequestArticleData,
        updateRequestArticleError
    } = props;

    const navigation = useNavigation();

    const [textInputValue, setTextInputValue] = useState("");
    const [description, setDescription] = useState("")
    const [darkMode, setDarkMode] = useState(false);
    const [value, setValue] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [postId, setPostId] = useState('');
    const [isFocus, setIsFocus] = useState(false);
    const [categories, setCategories] = useState<any>([]);

    useEffect(() => {
        setCategories(AppConfig.getPostCategories());
    });

    useEffect(() => {
        if (requestArticleData && requestArticleData.status === 'success') {
            setPostId(requestArticleData.data.id);
            updateArticle();
        }
    }, [requestArticleData, requestArticleError]);

    useEffect(() => {
        if (updateRequestArticleData && updateRequestArticleData.status === 'success') {
            console.log("Articel Requested: ", updateRequestArticleData.data.id);
        }
    }, [updateRequestArticleData, updateRequestArticleError]);

    const updateArticle = () => {
        if (postId && textInputValue.length > 0 && description.length > 30) {
            props.requestArticle({
                "requested_post_id": postId,
                "post_title": textInputValue,
                "category_id": categoryId,
                "post_body": description,
            })
        } else if (description.length < 30) {
            console.log("Description should contain mi 30 chars");
        }
    };

    const requestArticle = () => {
        if (textInputValue.length > 0) {
            props.requestArticle({
                "post_title": textInputValue,
                "category_id": categoryId,
            })
        }
    };

    const handleBackPress = () => {
        navigation.goBack();
    };

    return (
        <SafeAreaProvider >
            <SafeAreaView>
                <View style={headerStyle.container}>
                    <TouchableOpacity onPress={handleBackPress}>
                        <Image source={CONST.BACK_ICON} style={headerStyle.backButton} />
                    </TouchableOpacity>
                    <View>
                        <Image source={CONST.APP_LOGO} style={headerStyle.appLogoWithMargin} />
                    </View>
                </View>
                <ScrollView
                    style={{ marginBottom: 36 }}
                    nestedScrollEnabled={true}
                    alwaysBounceVertical={false}
                    automaticallyAdjustKeyboardInsets={true}>
                    <View style={style.contentCatogiriesView}>
                        <Text style={style.textView}>CATEGORY</Text>
                        <View style={{ flex: 1, marginHorizontal: 10 }}>
                            <Dropdown
                                style={[style.dropdown, isFocus && { borderColor: 'blue' }]}
                                placeholderStyle={style.placeholderStyle}
                                selectedTextStyle={style.selectedTextStyle}
                                inputSearchStyle={style.inputSearchStyle}
                                data={categories}
                                search
                                maxHeight={300}
                                labelField="name"
                                valueField="name"
                                searchPlaceholder="Search..."
                                value={value}
                                onChange={item => {
                                    setCategoryId(item.id);
                                    setValue(item.name);
                                    setIsFocus(false);
                                }}
                            />

                        </View>
                    </View>
                    <View style={style.container}>
                        <View style={{ marginBottom: 22 }}>
                            <View style={style.cardTop}>
                                <Text style={style.textView}>ASK AN ARTICLE ON THIS TOPIC</Text>
                            </View>
                            <View style={style.cardView}>
                                <Text style={style.textView}>TITLE</Text>
                                <View style={{ flex: 1 }}>
                                    <View style={style.inputBg}>
                                        {textInputValue === "" && (
                                            <Image style={style.image} source={CONST.ADD_TITLE_BG} />
                                        )}
                                    </View>
                                    <TextInput
                                        style={[style.textInput, { color: darkMode ? '#FFF' : '#000' }]}
                                        placeholder="Add Title"
                                        placeholderTextColor={darkMode ? '#666' : '#999'}
                                        multiline={true}
                                        textAlignVertical="top"
                                        value={textInputValue}
                                        onChangeText={(text) => setTextInputValue(text)}
                                    />
                                </View>
                            </View>
                            <View style={style.contentCardView}>
                                <Text style={style.textView}>DESCRIPTION</Text>
                                <View style={{ flex: 1 }}>
                                    <View style={style.inputBg}>
                                        {description === "" && (
                                            <Image style={style.image} source={CONST.ADD_CONTENT} />
                                        )}
                                    </View>
                                    <TextInput
                                        style={[style.textInput, { color: darkMode ? '#FFF' : '#000' }]}
                                        placeholder="Explain What Topic you Need In Breif"
                                        multiline={true}
                                        placeholderTextColor={darkMode ? '#666' : '#999'}
                                        textAlignVertical="top"
                                        value={description}
                                        onChangeText={(text) => setDescription(text)}
                                    />
                                </View>
                                <Pressable
                                    onPress={() => requestArticle()}
                                    style={{ alignItems: 'center', marginTop: 16 }}>
                                    <Image source={CONST.SUBMIT_ICON} />
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider >
    )
}
const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    textView: {
        color: COLORS.contentPrimaryColor,
        fontSize: 18,
        fontFamily: FONTS.poppinsSemiBold,
        paddingHorizontal: 18,
        paddingTop: 12,
        paddingBottom: 6
    },
    placeHolderBG: {
        padding: 8,
        borderRadius: 8,
        width: 100
    },
    cardTop: {
        height: 120,
        width: '88%',
        backgroundColor: COLORS.primaryBgColor,
        marginBottom: 20,
        marginTop: 20,
        start: 12,
        end: 30,
        borderRadius: 8,
        elevation: 2,
        ...Platform.select({
            ios: {
                shadowColor: COLORS.black,
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.2,
                shadowRadius: 3,
            }
        })
    },
    cardView: {
        marginTop: 18,
        backgroundColor: COLORS.primaryBgColor,
        marginHorizontal: 12,
        position: 'absolute',
        width: '90%',
        top: 50,
        left: 14,
        elevation: 2,
        borderRadius: 8,
        paddingBottom: 14,
        ...Platform.select({
            ios: {
                shadowColor: COLORS.black,
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.3,
                shadowRadius: 3,
            }
        })
    },
    contentCardView: {
        marginTop: 126,
        backgroundColor: COLORS.primaryBgColor,
        marginEnd: 12,
        marginStart: 26,
        elevation: 2,
        borderRadius: 8,
        paddingBottom: 14,
        ...Platform.select({
            ios: {
                shadowColor: COLORS.black,
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.3,
                shadowRadius: 3,
            }
        })
    },
    contentCatogiriesView: {
        marginTop: 14,
        backgroundColor: COLORS.primaryBgColor,
        marginEnd: 34,
        marginStart: 12,
        elevation: 2,
        borderRadius: 8,
        paddingBottom: 14,
        ...Platform.select({
            ios: {
                shadowColor: COLORS.black,
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.3,
                shadowRadius: 3,
            }
        })

    },
    inputBg: {
        height: 130,
        backgroundColor: COLORS.white,
        marginHorizontal: 16,
        borderRadius: 8,
        alignItems: 'center'
    },
    inputPg: {
        height: 50,
        backgroundColor: COLORS.white,
        marginHorizontal: 16,
        borderRadius: 8,
        alignItems: 'center'
    },
    textInput: {
        backgroundColor: COLORS.transparent,
        width: '92%',
        height: 130,
        position: 'absolute',
        paddingTop: 8,
        paddingStart: 26,
        paddingEnd: 22,
        paddingBottom: 12,
        borderRadius: 8,
        textAlign: 'left',
        fontSize: 17,
        fontFamily: FONTS.poppinsRegular,

    },
    articleCard: {
        flexDirection: 'row',
        flexShrink: 1,
        paddingStart: 16,
        paddingEnd: 16,
        paddingTop: 32
    },
    textDesc: {
        color: COLORS.contentPrimaryColor,
        fontSize: 11,
        fontFamily: FONTS.poppinsRegular,
        paddingStart: 32,
        flexShrink: 1,
    },
    textDate: {
        color: COLORS.contentSecondaryColor,
        fontSize: 11,
        fontFamily: FONTS.poppinsRegular
    },
    textTitle: {
        color: COLORS.contentPrimaryColor,
        fontSize: 11,
        fontFamily: FONTS.poppinsSemiBold
    },
    image: {
        flex: 1,
        alignItems: 'center'
    },
    addImageCard: {
        backgroundColor: '#D8D8D8',
        width: 110,
        height: 70,
        alignItems: 'center',
        borderRadius: 9,
        padding: 4,
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center'
    },
    pickerInput: {
        textAlign: 'center',
        justifyContent: 'center',
        fontFamily: FONTS.montserratBold,
        fontSize: 20,
        color: COLORS.white,
        height: 45,
        width: 240,
        right: 38,
        marginLeft: 10
    },
    dropdown: {
        height: 50,
        borderRadius: 8,
        paddingHorizontal: 8,
        backgroundColor: "white"
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});

export default RequestedArticleScreen;
