import React, { useState } from "react";
import { ScrollView, StyleSheet, View, Image, TouchableOpacity, TextInput, FlatList, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from '../../utils/Colors';
import { useNavigation } from "@react-navigation/native";
import { FONTS } from "../../utils/Fonts";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import headerStyle from "../common/HeaderStyles";
import * as CONST from '../../utils/Constants';
import style from './ArticlesScreenStyle';

const ArticlesSubmittedByMeScreen = () => {

  const navigation = useNavigation();
  const [statusFilter, setStatusFilter] = useState('All');

  const handleBackPress = () => {
    navigation.goBack();
  };

  const DATA = [
    {
      id: '1',
      date: 'APRIL 12 | 12:30',
      title: 'First Item',
      desc: 'MY PICKED ARTICLES about health',
      status: 'approved'
    },
    {
      id: '2',
      date: 'APRIL 12 | 12:30',
      title: 'Second Item',
      desc: 'MY PICKED ARTICLES about health'
    },
    {
      id: '3',
      date: 'APRIL 12 | 12:30',
      title: 'Third Item',
      desc: 'MY PICKED ARTICLES about health'
    },
    {
      id: '4',
      date: 'APRIL 12 | 12:30',
      title: 'Third Item',
      desc: 'MY PICKED ARTICLES about health'
    },
    {
      id: '5',
      date: 'APRIL 12 | 12:30',
      title: 'Third Item',
      desc: 'MY PICKED ARTICLES about health'
    },
    {
      id: '6',
      date: 'APRIL 12 | 12:30',
      title: 'Third Item',
      desc: 'MY PICKED ARTICLES about health'
    },
    {
      id: '7',
      date: 'APRIL 12 | 12:30',
      title: 'Third Item',
      desc: 'MY PICKED ARTICLES about health'
    },
    {
      id: '8',
      date: 'APRIL 12 | 12:30',
      title: 'Third Item',
      desc: 'MY PICKED ARTICLES about health'
    },
    {
      id: '9',
      date: 'APRIL 12 | 12:30',
      title: 'Third Item',
      desc: 'MY PICKED ARTICLES about health'
    },
    {
      id: '10',
      date: 'APRIL 12 | 12:30',
      title: 'Third Item',
      desc: 'MY PICKED ARTICLES about health to gym'
    },
    {
      id: '11',
      date: 'APRIL 12 | 12:30',
      title: 'Third Item',
      desc: 'MY PICKED ARTICLES about health number 10'
    },
  ];

  const seperator = () => {
    return (
      <View style={style.itemDivider} />
    )
  }
  const filteredData = DATA.filter((item) => {
    if (statusFilter === 'All') {
      return true;
    } else {
      return item.status === statusFilter;
    }
  });
  const Item = ({ title, date, desc, status }) => (  
    <View style={style.itemParent}>
      <Image source={CONST.PICKED_ARTICLES_ICON}
        style={style.itemIcon} />
      <View style={style.item}>
      <View style={style.statusContainer}>
        <Text style={style.statusText}>
          {status === 'approved' ? 'Approved' : status === 'rejected' ? 'Rejected' : 'Approve'}
        </Text>
      </View>
        <Text style={style.itemTitle}>{title}</Text>
        <Text style={style.itemDate}>{date}</Text>
        <Text style={style.itemDesc}>{desc}</Text>
      </View>
    </View>
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
              <Text style={style.title}>ARTICLES SUBMITTED BY ME</Text>
            </View>
            {DATA && DATA.length > 0 ? (
            <FlatList
              data={DATA}
              ItemSeparatorComponent={seperator}
              renderItem={({ item }) => <Item title={item.title} date={item.date} desc={item.desc} />}
              keyExtractor={item => item.id}
            />
          ) : (
            <View>
              <Image source={CONST.SLEEP_CAT} style={style.defaultImage} /> 
              <Text style={{color:"#707070", fontSize:30, fontWeight:'bold', left: 50, top: 30, marginBottom: 40}}>NO DATA AVAILABLE !</Text>
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

export default ArticlesSubmittedByMeScreen;
