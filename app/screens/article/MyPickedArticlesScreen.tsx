import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Image, TouchableOpacity, TextInput, FlatList, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from '../../utils/Colors';
import { useNavigation } from "@react-navigation/native";
import headerStyle from "../common/HeaderStyles";
import * as CONST from '../../utils/Constants';
import style from './ArticlesScreenStyle';

const MyPickedArticlesScreen = (props: any) => {

  const {
    myPickedArticlesData,
    myPickedArticlesError
  } = props

  const navigation = useNavigation();

  const [myPickedArticles, setMyPickedArticles] = useState<any>([]);

  const handleBackPress = () => {
    navigation.goBack();
  };

  useEffect(() => {
    props.myPickedArticles();
  }, []);

  useEffect(() => {
    handlemypostsData()
  }, [myPickedArticlesData, myPickedArticlesError]);

  const handlemypostsData = () => {
    if (myPickedArticlesData && myPickedArticlesData.data) {
      if (myPickedArticlesData.status === 'success') {
        setMyPickedArticles(myPickedArticlesData.data.data)
      }
    }
  }

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
      <SafeAreaView  style={{flex: 1 }}>
      <ScrollView style={{ backgroundColor: COLORS.white, flex: 1 }}>

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
              <Text style={style.title}>MY PICKED ARTICLES</Text>
            </View>
            <View style={[style.imageContainer, myPickedArticles.length === 0 && { flex: 1 }]}>
            {myPickedArticles && myPickedArticles.length > 0 ? (
              <FlatList
                data={myPickedArticles}
                ItemSeparatorComponent={seperator}
                renderItem={({ item }) => <Item title={item.title} date={item.created_at} desc={item.body} />}
                keyExtractor={(item, index) => index.toString()}
              />
            ) : (
              <View  style={{backgroundColor: COLORS.primaryBgColor, flex: 1,
                marginHorizontal: 22,}}>
              <Image source={CONST.SLEEP_CAT} style={style.defaultImage} /> 
              <Text style={{color:"#707070", fontSize:30, fontWeight:'bold', left: 45, top: 30, marginBottom: 380}}>NO DATA AVAILABLE !</Text>
              </View>
               )}
              </View>
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
        returnKeyType='done'
        value={searchText}
        placeholderTextColor={darkMode ? '#666' : '#999'}
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

export default MyPickedArticlesScreen;
