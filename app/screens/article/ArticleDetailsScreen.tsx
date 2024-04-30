import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Image, TouchableOpacity, TextInput, FlatList, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from '../../utils/Colors';
import { useNavigation } from "@react-navigation/native";
import headerStyle from "../common/HeaderStyles";
import * as CONST from '../../utils/Constants';
import * as AppConfig from '../../utils/AppConfig';
import * as IXNUtils from '../../utils/IXNUtils';
import { FONTS } from "../../utils/Fonts";
import { format } from 'date-fns';

const ArticleDetailsScreen = (props: any) => {

    const {
        postsByArticleIdData,
        postsByArticleIdError,
    } = props;

    const navigation = useNavigation();
    const [responseData, setResponseData] = useState<any>([]);
    const [article, setArticle] = useState<any>('');

    const handleBackPress = () => {
        navigation.goBack();
    };

    useEffect(() => {
        setArticle(AppConfig.getSelectedArticle());
    });

    useEffect(() => {
        props.getAllPostsByArticle({
            "requested_post_id": 1
        });
    }, [])

    useEffect(() => {

        if (postsByArticleIdData && postsByArticleIdData.data) {
            if (postsByArticleIdData.status === 'success') {
                console.log("postsByArticleIdData: ", postsByArticleIdData.data.data);
                setResponseData(postsByArticleIdData.data.data);
            }
        }
    });

    const seperator = () => {
        return (
            <View style={style.itemDivider} />
        )
    }

    const handleButtonPress = () => {
        navigation.navigate("WriteArticleScreen")
    };

    const Item = ({ title, date }) => (
        <View style={style.itemParent}>
            <Image source={CONST.PICKED_ARTICLES_ICON}
                style={style.itemIcon} />
            <View style={style.item}>
                <Text numberOfLines={2} style={style.itemTitle}>{title}</Text>
                <Text style={style.itemDate}>{format(date, 'MMMM dd | H:mma')}</Text>
                <Text style={style.itemDesc}>{ }</Text>
            </View>
        </View>
    );
    return (
        <SafeAreaProvider style={{ backgroundColor: COLORS.white }}>
            <SafeAreaView >
                <ScrollView >
                    <View style={headerStyle.container}>
                        <TouchableOpacity onPress={handleBackPress}>
                            <Image source={CONST.BACK_ICON} style={headerStyle.backButton} />
                        </TouchableOpacity>
                        <View>
                            <Image source={CONST.APP_LOGO} style={headerStyle.appLogoWithMargin} />
                        </View>
                    </View>
                    <View style={style.container}>
                        <Text style={style.text}>REQUEST ARTICLES</Text>
                    </View>
                    <View style={style.cardView}>
                        <Text numberOfLines={1} style={style.textTitle}>{article.title}</Text>
                        <Text style={style.textDate} >{article.date}</Text>
                        <Text style={{ padding: 12 }} ellipsizeMode="tail">
                            {article.desc}
                        </Text>
                    </View>
                    <View style={style.button}>
                        <TouchableOpacity onPress={handleButtonPress}>
                            <Text style={style.textbutton}>Write article for this topic</Text>
                        </TouchableOpacity>
                    </View>
                    {responseData ? (
                        <View style={style.cardResponse}>
                            <View style={style.title}>
                                <Text style={style.textbutton1}>RECENT RESPONSES</Text>
                            </View>
                            <FlatList
                                data={responseData}
                                ItemSeparatorComponent={seperator}
                                renderItem={({ item }) => <Item title={item.title} date={item.created_at} />}
                                keyExtractor={item => item.id}
                            />
                        </View>
                    ) : (
                        <View>
                            <Image source={CONST.CAT_IMAGE} style={style.Image} />
                            <View style={style.textResponse}>
                                <Text style={style.textStyle}>BE THE FIRST ONE TO RESPONSE !</Text>
                            </View>
                        </View>
                    )}
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const style = StyleSheet.create({

    container: {
        backgroundColor: '#C0DDFF',
        padding: 12,
        marginTop: 12,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        marginHorizontal: 20,
    },
    text: {
        textAlign: 'center',
        fontSize: 18,
        color: '#000000',
        fontFamily: FONTS.poppinsSemiBold
    },
    cardView: {
        backgroundColor: '#E8F2FE',
        height: 220,
        marginHorizontal: 20,
    },
    button: {
        marginTop: 8,
        marginHorizontal: 20,
        backgroundColor: '#0DC400',
        padding: 15,
        borderRadius: 8
    },
    title: {
        backgroundColor: '#AAFFC9',
        padding: 15,
        borderTopLeftRadius: 8,
        borderTopEndRadius: 8,
    },
    textbutton: {
        textAlign: 'center',
        fontSize: 20,
        color: '#FFFFFF',
        fontFamily: FONTS.poppinsRegular
    },
    textbutton1: {
        textAlign: 'center',
        fontSize: 18,
        color: '#000000',
        fontFamily: FONTS.poppinsSemiBold
    },
    textTitle: {
        fontSize: 17,
        fontFamily: FONTS.poppinsSemiBold,
        paddingHorizontal: 16,
        marginTop: 16,
    },
    textDate: {
        fontSize: 11,
        fontFamily: FONTS.poppinsRegular,
        paddingHorizontal: 16,
        marginTop: 12,
        color: '#8B8B8B',
    },
    Image: {
        marginTop: 50,
    },
    textResponse: {
        padding: 18,
        textAlign: 'center'
    },
    textStyle: {
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 24,
        marginTop: 20,
        color: '#8D8D8D'
    },
    Relatedbutton: {
        marginTop: 8,
        marginHorizontal: 20,
        backgroundColor: '#AAFFC9',
        padding: 15,
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8
    },
    topicbutton: {
        textAlign: 'center',
        fontSize: 25,
        color: '#000000'
    },
    cardResponse: {
        backgroundColor: '#E8FEF0',
        height: 220,
        marginHorizontal: 20,
        marginVertical: 16,
    },
    itemParent: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 16,
        paddingVertical: 12,
    },
    item: {
        width: 190,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    itemTitle: {
        fontSize: 11,
        fontFamily: FONTS.poppinsSemiBold,
        color: COLORS.contentPrimaryColor,
        marginTop: 12,
    },
    itemDesc: {
        fontSize: 11,
        fontFamily: FONTS.poppinsRegular,
        color: COLORS.contentPrimaryColor,
        paddingTop: 8,
        paddingEnd: 2,
    },
    itemDate: {
        fontSize: 11,
        fontFamily: FONTS.poppinsRegular,
        color: '#8B8B8B',
        marginTop: 4
    },
    itemIcon: {
        width: 136,
        height: 92,
    },
    itemDivider: {
        backgroundColor: '#0dc400',
        height: 1,
        marginHorizontal: 20,
    },

});

export default ArticleDetailsScreen;