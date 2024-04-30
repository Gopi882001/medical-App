import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Image, TouchableOpacity, TextInput, FlatList, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from '../../utils/Colors';
import { useNavigation } from "@react-navigation/native";
import { FONTS } from "../../utils/Fonts";
import headerStyle from "../common/HeaderStyles";
import * as CONST from '../../utils/Constants';
import * as AppConfig from '../../utils/AppConfig';
import ViewContainer from '../common/responseView';
import { format } from "date-fns";

const AllRequestedArticlesScreen = (props: any) => {

  const {
    allRequestedArticlesData,
    allRequestedArticlesError,
  } = props;

  const navigation = useNavigation();
  const [articles, setArticles] = useState<any>([]);

  useEffect(() => {
    props.allRequestedArticles();
  }, []);

  useEffect(() => {
    if (allRequestedArticlesData && allRequestedArticlesData.status === 'success') {
      setArticles(allRequestedArticlesData.data.data);
    }
  }, [allRequestedArticlesData, allRequestedArticlesError]);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handlePressArticle = () => {
    navigation.navigate('ArticleDetails');
  }

  const seperator = () => {
    return (
      <View style={style.itemDivider} />
    )
  }
  const renderItem = ({ item }: { item: { title: string, date: string, desc: string, responseCount: number } }) => (

    <TouchableOpacity
      onPress={() => {
        console.log("Item: ", item);
        AppConfig.updateSelectedArticle(item);
        handlePressArticle()
      }}>
      <View style={style.itemParent}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={style.item}>
            <Text style={style.itemTitle}>{item.title}</Text>
            <Text style={style.itemDate}>{format(item.created_at, 'MMMM dd | H:mma')}</Text>
            <Text style={style.itemDesc}>{item.slug}</Text>
          </View>
          <View
            style={{
              flex: 1,
              padding: 12
            }}>
            <Text style={{
              fontSize: 11,
              fontFamily: FONTS.poppinsRegular,
              color: 'black'
            }}>{item.body}</Text>
          </View>
        </View>
        <View style={style.responseView}>
          <ViewContainer responseCount={item.response_count} />
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
              <Text style={style.title}>ALL REQUESTED ARTICLES</Text>
            </View>
            {articles.length === 0 ? (
              <View>
                <Image source={CONST.SLEEP_CAT} style={style.defaultImage} />
                <Text style={{ color: "#707070", fontSize: 30, fontWeight: 'bold', left: 50, top: 30, marginBottom: 40 }}>NO DATA AVAILABLE !</Text>
              </View>
            ) : (
              <FlatList
                data={articles}
                ItemSeparatorComponent={seperator}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
              />
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
        returnKeyType='done'
        placeholderTextColor={darkMode ? '#666' : '#999'}
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
    flexDirection: 'column',
    backgroundColor: COLORS.primaryBgColor,
    marginHorizontal: 22,
  },
  responseView: {
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 6
  },
  item: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLORS.primaryBgColor,
    padding: 12,
  },
  itemTitle: {
    fontSize: 11,
    fontFamily: FONTS.poppinsSemiBold,
    color: COLORS.contentPrimaryColor
  },
  itemDesc: {
    flex: 1,
    fontSize: 11,
    fontFamily: FONTS.poppinsRegular,
    color: COLORS.contentPrimaryColor,
  },
  itemDate: {
    fontSize: 11,
    fontFamily: FONTS.poppinsRegular,
    color: '#8B8B8B'
  },
  itemDivider: {
    backgroundColor: '#3F7FCD',
    height: 1,
    width: '89%',
    marginHorizontal: 22,
  },
  titleContainer: {
    backgroundColor: COLORS.primaryBgColor,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginHorizontal: 22,
    marginTop: 21
  },
  defaultImage: {
    alignSelf: 'center',
    marginTop: 60,
  },
  title: {
    fontSize: 18,
    fontFamily: FONTS.poppinsSemiBold,
    color: COLORS.contentPrimaryColor,
    padding: 12
  }

});

export default AllRequestedArticlesScreen;
