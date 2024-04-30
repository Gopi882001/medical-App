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

const WriteArticleScreen = (props: any) => {

    const {
        addNewPostData,
        addNewPostError,
        updatePost,
        updateError,
    } = props;

    const navigation = useNavigation();

    const handleBackPress = () => {
        navigation.goBack();
    };
    const [titleValue, setTitleValue] = useState("");
    const [contentInputValue, setContentInputValue] = useState("");
    const [darkMode, setDarkMode] = useState(false);
    const [postId, setPostId] = useState("");

    const createPost = () => {
        if (titleValue.length != 0 && contentInputValue.length == 0) {
            props.addNewPost({
                "post_title": titleValue,
                "category_id": 2000,
                "requested_post_id": 1
            })
        } else if (titleValue.length != 0 && contentInputValue.length != 0) {
            props.update({
                "post_id": postId,
                "post_content": contentInputValue,
                "post_title": titleValue,
                "category_id": 2000
            })
        }
    }

    useEffect(() => {
        if (addNewPostData && addNewPostData.data) {
            if (addNewPostData.status === 'success') {
                console.log("Post create with id: ", addNewPostData.data.id)
                setPostId(addNewPostData.data.id)
            }
        }
    }, [addNewPostData, addNewPostError]);

    useEffect(() => {
        if (updatePost && updatePost.data) {
            if (addNewPostData.status === 'success') {
                console.log("Post create with id: ", addNewPostData.data.id)
                setPostId(addNewPostData.data.id)
            }
        }
    }, [updatePost, updateError]);

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
                    <View style={style.container}>
                        <View style={{ marginBottom: 22 }}>
                            <View style={style.cardTop}>
                                <Text style={style.textView}>WRITE AN ARTICLE ON SELECTED TOPIC</Text>
                            </View>
                            <View style={style.cardBottom}>
                                <View style={style.articleCard}>
                                    <View style={{ flexDirection: 'column' }}>
                                        <Text
                                            style={style.textTitle}>WANDA VISION NEW</Text>
                                        <Text style={style.textDate}>APRIL 12 | 12:30</Text>
                                    </View>
                                    <Text style={style.textDesc}>MY PICKED ARTICLES About health</Text>
                                </View>
                            </View>
                        </View>
                        <View style={style.cardView}>
                            <Text style={style.textView}>TITLE</Text>
                            <View style={{ flex: 1 }}>
                                <View style={style.inputBg}>
                                    {titleValue === "" && (
                                        <Image style={style.image} source={CONST.ADD_TITLE_BG} />
                                    )}
                                </View>
                                <TextInput
                                    style={[style.textInput, { color: darkMode ? '#FFF' : '#000' }]}
                                    placeholder="Add Title"
                                    keyboardType='default'
                                    returnKeyType='done'
                                    multiline={true}
                                    placeholderTextColor={darkMode ? '#666' : '#999'}
                                    textAlignVertical="top"
                                    value={titleValue}
                                    onChangeText={(text) => setTitleValue(text)}
                                    onSubmitEditing={(event) => createPost()}
                                />
                            </View>
                        </View>
                        <View style={style.cardView}>
                            <Text style={style.textView}>IMAGE</Text>
                            <View style={{ flex: 1 }}>
                                <View style={style.inputBg}>
                                    <Image style={style.image}
                                        source={CONST.ADD_IMAGE} />
                                </View>
                                <View style={style.addImageCard}>
                                    <Image
                                        source={CONST.ADD_ROUND_BLUE}
                                        style={{
                                            alignSelf: 'center'
                                        }} />
                                    <Text style={style.addImageText}>Add Image</Text>
                                </View>
                            </View>
                        </View>
                        <View style={style.cardView}>
                            <Text style={style.textView}>CONTENT</Text>
                            <View style={{ flex: 1 }}>
                                <View style={style.inputBg}>
                                    {contentInputValue === "" && (
                                        <Image style={style.image} source={CONST.ADD_CONTENT} />
                                    )}
                                </View>
                                <TextInput
                                    style={[style.textInput, { color: darkMode ? '#FFF' : '#000' }]}
                                    placeholder="Write Your Article Here"
                                    multiline={true}
                                    textAlignVertical="top"
                                    placeholderTextColor={darkMode ? '#666' : '#999'}
                                    value={contentInputValue}
                                    onChangeText={(text) => setContentInputValue(text)}
                                />
                            </View>
                            <Pressable
                                onPress={() => createPost()}
                                style={{ alignItems: 'center', marginTop: 16 }}>
                                <Image source={CONST.SUBMIT_ICON} />
                            </Pressable>
                        </View>

                        <TouchableOpacity >
                            <Image source={CONST.DELETE_ICON} style={style.deleteicon} />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider >
    )
}
const style = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 36,
    },
    textView: {
        color: COLORS.contentPrimaryColor,
        fontSize: 18,
        fontFamily: FONTS.poppinsSemiBold,
        paddingHorizontal: 18,
        paddingTop: 12,
        paddingBottom: 6
    },
    cardTop: {
        height: 120,
        width: '84%',
        backgroundColor: COLORS.primaryBgColor,
        marginBottom: 20,
        marginTop: 20,
        start: 20,
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
    cardBottom: {
        height: 90,
        width: '86%',
        backgroundColor: '#D2E2F5',
        position: 'absolute',
        top: 54,
        left: 36,
        borderRadius: 8,
        marginTop: 32,
        elevation: 8,
        ...Platform.select({
            ios: {
                shadowColor: COLORS.black,
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.4,
                shadowRadius: 4,
            }
        })
    },
    cardView: {
        marginTop: 16,
        backgroundColor: COLORS.primaryBgColor,
        marginHorizontal: 16,
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
        fontFamily: FONTS.poppinsRegular
    },
    addImageText: {
        color: COLORS.contentPrimaryColor,
        fontSize: 11,
        fontFamily: FONTS.poppinsRegular,
        alignContent: 'center',
        right: 3
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
        alignItems: 'center',
    },
    addImageCard: {
        width: 70,
        height: 60,
        alignItems: 'flex-end',
        position: 'absolute',
        alignSelf: 'flex-end',
        bottom: -4,
        right: 19

    },
    deleteicon: {
        width: 35,
        height: 40,
        position: 'relative',
        left: 34,
        top: 10,
        marginTop: 8
    },
});

export default WriteArticleScreen;
