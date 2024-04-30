import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Image, TouchableOpacity, TextInput, FlatList, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from '../../utils/Colors';
import { useNavigation } from "@react-navigation/native";
import { FONTS } from "../../utils/Fonts";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import headerStyle from "../common/HeaderStyles";
import * as CONST from '../../utils/Constants';
import style from './ArticlesScreenStyle';

const RequestedArticlesScreen = (props: any) => {

  const {
    myRequestedArticlesData,
    myRequestedArticlesError,
  } = props;

  const [postsData, setPostsData] = useState<any>([]);
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  useEffect(() => {
    props.myPosts();
  }, []);

  useEffect(() => {
    if (myRequestedArticlesError && myRequestedArticlesError.data) {
      if (myRequestedArticlesError.status === 'success') {
        setPostsData(myRequestedArticlesError.data.data);
      }
    }
  }, [myRequestedArticlesData, myRequestedArticlesError]);

  const seperator = () => {
    return (
      <View style={style.itemDivider} />
    )
  }

  const handlePressArticle = () => {
    navigation.navigate('RequestedArticles1');
  }
  const Item = ({ title, date, desc }) => (
    <TouchableOpacity onPress={handlePressArticle}>
    <View style={style.itemParent}>
      <Image source={CONST.PICKED_ARTICLES_ICON}
        style={style.itemIcon} />
      <View style={style.item}>
        <Text style={style.itemTitle}>{title}</Text>
        <Text style={style.itemDate}>{date}</Text>
        <Text style={style.itemDesc}>{desc}</Text>
      </View>
    </View>
    </TouchableOpacity>
  );

  return (

    <SafeAreaProvider >
      <SafeAreaView >
        <ScrollView style={{ backgroundColor: COLORS.white }}>
          <View style={style.container}>
            <View style={headerStyle.container}>
              <TouchableOpacity onPress={handleBackPress}>
                <Image source={CONST.BACK_ICON} style={headerStyle.backButton} />
              </TouchableOpacity>
              <View>
                <Image source={CONST.APP_LOGO} style={headerStyle.appLogoWithMargin} />
              </View>
            </View>
            <SearchBar />
            <View style={style.titleContainer}>
              <Text style={style.title}>REQUESTED ARTICLES</Text>
            </View>
            {postsData && postsData.length > 0 ? (
            <FlatList
              data={postsData}
              ItemSeparatorComponent={seperator}
              renderItem={({ item }) => <Item title={item.title} date={item.date} desc={item.desc} />}
              keyExtractor={item => item.id}
            />
          ) : (
            <View  style={{backgroundColor: COLORS.primaryBgColor, flex: 1,
              marginHorizontal: 22,}}>
            <Image source={CONST.SLEEP_CAT} style={style.defaultImage} /> 
            <Text style={{color:"#707070", fontSize:30, fontWeight:'bold', left: 45, top: 30, marginBottom: 380}}>NO DATA AVAILABLE !</Text>
            </View>
          )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const SearchBar = () => {

  const [searchText, setSearchText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleSearch = (text: any) => {
    setSearchText(text);
    setIsTyping(text.length > 0);
  };

  const clearSearch = () => {
    setSearchText('');
    setIsTyping(false);
  };

  const handleSearchPress = () => {
    if (isTyping) {
      clearSearch();
    } else {
      // Perform search
      console.log('Performing search');
    }
  };

  return (
    <View style={style.searchContainer}>
      <TextInput
        style={style.input}
        placeholder="Search"
        placeholderTextColor={darkMode ? '#666' : '#999'}
        returnKeyType='done'
        value={searchText}
        onChangeText={handleSearch}

      />
      <TouchableOpacity onPress={handleSearchPress}>
        <Image
          source={isTyping ? CONST.CANCEL_ICON : CONST.SEARCH_ICON}
          style={style.searchIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default RequestedArticlesScreen;
