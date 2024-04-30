import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, View, Image, TouchableOpacity, Text, Platform, Pressable } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../utils/Colors";
import { StyleSheet } from "react-native";
import { FONTS } from "../../utils/Fonts";
import headerStyle from "../common/HeaderStyles";
import * as CONST from "../../utils/Constants";
import { Shadow } from 'react-native-shadow-2';

const ArticlesDashboardScreen = (props: any) => {
    const {
        postsCountData,
        postsCountError,
    } = props;

    const handleBackPress = () => {
        navigation.goBack();
    };
    const navigation = useNavigation();
    const [postsCount, setpostsCount] = useState<any>('');

    useEffect(() => {
        console.log("postsCountData: ")
        props.getPostsCount();
    }, []);

    useEffect(() => {
        console.log("postsCountData: ", postsCountData)
        if (postsCountData && postsCountData.data) {
            console.log("postsCountData: ", postsCountData.data)
            setpostsCount(postsCountData.data);
        }
    }, [postsCountData, postsCountError]);

    const navigateToAllRequesterdArticles = () => {
        navigation.navigate('AllRequestedArticles');
    }

    const navigateToMyPickedArticles = () => {
        navigation.navigate('MyPickedArticles');
    }

    const navigateToArticlesSubmittedByMe = () => {
        navigation.navigate('ArticlesSubmittedByMe');
    }

    const navigateToRequestedArticles = () => {
        navigation.navigate('RequestedArticles');
    }

    const navigateToWriteArticles = () => {
        navigation.navigate('WriteArticleScreen');
    }

    if (Platform.OS === 'ios') {
        return (
            <SafeAreaProvider >
                <SafeAreaView >
                    <ScrollView>
                        <View style={style.container}>
                            <View style={headerStyle.container}>
                                <TouchableOpacity onPress={handleBackPress}>
                                    <Image source={CONST.BACK_ICON} style={headerStyle.backButton} />
                                </TouchableOpacity>
                                <View>
                                    <Image source={CONST.APP_LOGO} style={headerStyle.appLogoWithMargin} />
                                </View>
                            </View>
                            <Pressable onPress={navigateToAllRequesterdArticles}>
                                <View
                                    style={style.allArticlesTile}>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <Text style={style.textTitle}>ALL REQUESTED ARTICLES</Text>
                                        <Image source={CONST.ALL_ARTICLES_ICON} style={style.imageAll}></Image>
                                    </View>
                                    <Text style={style.textNumber}>{postsCount.all_requested_articles}</Text>
                                </View>
                            </Pressable>
                            <Pressable onPress={navigateToMyPickedArticles}>
                                <View
                                    style={style.myPickedArticlesTile}>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <Text style={style.textTitle}>MY PICKED ARTICLES</Text>
                                        <Image source={CONST.MY_PICKED_ARTICLES_ICON} style={style.imageMy}></Image>
                                    </View>
                                    <Text style={style.textNumber}>{postsCount.my_picked_articles}</Text>
                                </View>
                            </Pressable>
                            <Pressable onPress={navigateToArticlesSubmittedByMe}>
                                <View
                                    style={style.articlesSubmitedByMeTile}>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <Text style={style.textTitle}>ARTICLES SUBMITTED BY ME</Text>
                                        <Image source={CONST.MY_ARTICLES_ICON} style={style.imageSubMy}></Image>
                                    </View>
                                    <Text style={style.textNumber}>{postsCount.my_submitted_articles}</Text>
                                </View>
                            </Pressable>
                            <Pressable onPress={navigateToRequestedArticles} >
                                <View
                                    style={style.requestedArticlesTile}>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <Text style={style.textTitle}>REQUESTED ARTICLES</Text>
                                        <Image source={CONST.REQUESTED_ARTICLES_ICON} style={style.imageReq}></Image>
                                    </View>
                                    <Text style={style.textNumber}>{postsCount.my_requested_articles}</Text>
                                </View>
                            </Pressable>
                            <Pressable onPress={navigateToWriteArticles} >
                                <View
                                    style={style.requestedArticlesTile}>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <Text style={style.textTitle}>WRITE ARTICLES</Text>
                                        <Image source={CONST.WRITE_ARTICLES_ICON} style={style.imageReq}></Image>
                                    </View>
                                </View>
                            </Pressable>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </SafeAreaProvider>
        )
    } else {
        return (
            <SafeAreaProvider >
                <SafeAreaView >
                    <ScrollView>
                        <View style={style.container}>
                            <View style={headerStyle.container}>
                                <TouchableOpacity onPress={handleBackPress}>
                                    <Image source={CONST.BACK_ICON} style={headerStyle.backButton} />
                                </TouchableOpacity>
                                <View>
                                    <Image source={CONST.APP_LOGO} style={headerStyle.appLogoWithMargin} />
                                </View>
                            </View>
                            <Pressable onPress={navigateToAllRequesterdArticles}>
                                <View
                                    style={style.allArticlesTile}>
                                    <Shadow
                                        style={{
                                            borderRadius: 16,
                                            marginEnd: 86
                                        }}
                                        startColor="#C2DFE1"
                                        endColor={COLORS.transparent}
                                        distance={8}>
                                        <View style={{ flex: 1, flexDirection: 'row' }}>
                                            <Text style={style.textTitle}>ALL REQUESTED ARTICLES</Text>
                                            <Image source={CONST.ALL_ARTICLES_ICON} style={style.imageAll}></Image>
                                        </View>
                                        <Text style={style.textNumber}>{postsCount.all_requested_articles}</Text>
                                    </Shadow>
                                </View>
                            </Pressable>
                            <Pressable onPress={navigateToMyPickedArticles}>
                                <View
                                    style={style.myPickedArticlesTile}>
                                    <Shadow
                                        style={{
                                            borderRadius: 16,
                                            marginEnd: 40
                                        }}
                                        startColor="#ECE2C4"
                                        endColor={COLORS.transparent}
                                        distance={8}>
                                        <View style={{ flex: 1, flexDirection: 'row' }}>
                                            <Text style={style.textTitle}>MY PICKED ARTICLES</Text>
                                            <Image source={CONST.MY_PICKED_ARTICLES_ICON} style={style.imageMy}></Image>
                                        </View>
                                        <Text style={style.textNumber}>{postsCount.my_picked_articles}</Text>
                                    </Shadow>
                                </View>
                            </Pressable>
                            <Pressable onPress={navigateToArticlesSubmittedByMe}>
                                <View
                                    style={style.articlesSubmitedByMeTile}>
                                    <Shadow
                                        style={{
                                            borderRadius: 16,
                                            marginEnd: 52
                                        }}
                                        startColor="#CDEFC1"
                                        endColor={COLORS.transparent}
                                        distance={8}>
                                        <View style={{ flex: 1, flexDirection: 'row' }}>
                                            <Text style={style.textTitle}>ARTICLES SUBMITTED BY ME</Text>
                                            <Image source={CONST.MY_ARTICLES_ICON} style={style.imageSubMy}></Image>
                                        </View>
                                        <Text style={style.textNumber}>{postsCount.my_submitted_articles}</Text>
                                    </Shadow>
                                </View>
                            </Pressable>
                            <Pressable onPress={navigateToRequestedArticles} >
                                <View
                                    style={style.requestedArticlesTile}>
                                    <Shadow
                                        style={{
                                            borderRadius: 16,
                                            marginEnd: 102
                                        }}
                                        startColor="#C1E8EA"
                                        endColor={COLORS.transparent}
                                        distance={8}>
                                        <View style={{ flex: 1, flexDirection: 'row' }}>
                                            <Text style={style.textTitle}>MY REQUESTED ARTICLES</Text>
                                            <Image source={CONST.REQUESTED_ARTICLES_ICON} style={style.imageReq}></Image>
                                        </View>
                                        <Text style={style.textNumber}>{postsCount.my_requested_articles}</Text>
                                    </Shadow>
                                </View>
                            </Pressable>
                            <Pressable onPress={navigateToWriteArticles} >
                                <View
                                    style={style.writeArticlesTile}>
                                    <Shadow
                                        style={{
                                            borderRadius: 16,
                                            marginEnd: 132
                                        }}
                                        startColor="#C1E8EA"
                                        endColor={COLORS.transparent}
                                        distance={8}>
                                        <View style={{ flex: 1, flexDirection: 'row' }}>
                                            <Text style={style.textTitle}>WRITE {"\n"}ARTICLES</Text>
                                            <Image source={CONST.WRITE_ARTICLES_ICON} style={style.imageWriteReq}></Image>
                                        </View>
                                    </Shadow>
                                </View>
                            </Pressable>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </SafeAreaProvider>
        )
    }
}

const style = StyleSheet.create({

    imageAll: {
        alignSelf: 'flex-end',
        right: 60,
        top: Platform.OS === 'ios' ? 76 : 80
    },
    imageMy: {
        alignSelf: 'flex-end',
        right: 46,
        top: Platform.OS === 'ios' ? 76 : 80
    },
    imageSubMy: {
        alignSelf: 'flex-end',
        right: 42,
        top: Platform.OS === 'ios' ? 76 : 80
    },
    imageReq: {
        alignSelf: 'flex-end',
        right: 72,
        top: Platform.OS === 'ios' ? 76 : 80
    },
    imageWriteReq: {
        alignSelf: 'flex-end',
        right: 112,
        top: Platform.OS === 'ios' ? 76 : 4
    },
    textTitle: {
        marginTop: 16,
        marginHorizontal: 12,
        width: '60%',
        color: COLORS.contentPrimaryColor,
        fontSize: 22,
        fontFamily: FONTS.poppinsMedium
    },
    textNumber: {
        marginTop: 20,
        paddingBottom: 16,
        marginHorizontal: 20,
        fontSize: 27,
        fontFamily: FONTS.poppinsLight,
        color: COLORS.contentPrimaryColor
    },
    allArticlesTile: {
        marginTop: 32,
        height: 160,
        marginHorizontal: 24,
        backgroundColor: COLORS.primaryBgColor,
        borderRadius: 16,
        ...Platform.select({
            ios: {
                shadowColor: '#007B817D',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 1,
                shadowRadius: 8,
            }
        })
    },
    articlesSubmitedByMeTile: {
        marginTop: 32,
        height: 160,
        marginHorizontal: 24,
        backgroundColor: '#EEFEE8',
        borderRadius: 16,
        ...Platform.select({
            ios: {
                shadowColor: '#34BE007D',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 1,
                shadowRadius: 8,
            }
        })
    },
    myPickedArticlesTile: {
        marginTop: 32,
        height: 160,
        marginHorizontal: 24,
        backgroundColor: '#FEFDE8',
        borderRadius: 16,
        ...Platform.select({
            ios: {
                shadowColor: '#AD85077D',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 1,
                shadowRadius: 8,
            }
        })
    },
    requestedArticlesTile: {
        marginTop: 32,
        height: 160,
        marginHorizontal: 24,
        backgroundColor: '#E8FDFE',
        borderRadius: 12,
        ...Platform.select({
            ios: {
                shadowColor: '#02A4AC7D',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 1,
                shadowRadius: 8,
            }
        })
    },
    writeArticlesTile: {
        marginTop: 32,
        height: 160,
        marginHorizontal: 24,
        backgroundColor: '#E8FDFE',
        borderRadius: 12,
        marginBottom: 24,
        ...Platform.select({
            ios: {
                shadowColor: '#02A4AC7D',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 1,
                shadowRadius: 8,
            }
        })
    },
    safeAreaContainer: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    container: {
        flex: 1, backgroundColor: COLORS.white
    },
});

export default ArticlesDashboardScreen;
