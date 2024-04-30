import React, { useRef, useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, ScrollView, FlatList, Dimensions } from 'react-native';
import { phnbarstyles, phndirectorystyles, styles } from './PhoneDirectoryDetailScreenLightStyle';
import PhoneDirectoryItemDetailComponent from './PhoneDirectoryItemDetailComponent';
import { COLORS } from '../../utils/Colors';
import { useNavigation } from '@react-navigation/native';
import * as CONST from '../../utils/Constants';
import headerStyle from '../common/HeaderStyles';
import * as AppConfig from '../../utils/AppConfig';
import FastImage from 'react-native-fast-image';

const PhoneDirectoryDetailScreenComponents = (props: any) => {

  const {
    contactsOfCategoryData,
    contactsOfCategoryError,
  } = props

  const [titles, setTitles] = useState<any>([]);
  const [contacts, setContacts] = useState<any>([]);
  const [selectedTitle, setSelectedTitle] = useState<any>(null);
  const [showAllItems, setShowAllItems] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const scrollRef = useRef<ScrollView>(null);
  const { width, height } = Dimensions.get('window');
  const [screenDimensions, setScreenDimensions] = useState({ width, height });
  const navigation = useNavigation();

  const handleBackIconPress = () => {
    navigation.goBack();
  };

  useEffect(() => {
    props.getContactsOfCategories({
      latitude: 26.31577000,
      longitude: 73.11267000,
      city: "Jodhpur"
    })
  }, []);

  useEffect(() => {
    console.log("Console log data ");
    if (contactsOfCategoryData) {
      if (contactsOfCategoryData.status === 'success' && contactsOfCategoryData.data) {
        const data = contactsOfCategoryData.data.data;
        setContacts(data);
      }
    }
  }, [contactsOfCategoryData, contactsOfCategoryError]);

  useEffect(() => {
    const updateScreenDimensions = () => {
      updateScreenDimensions({ width, height });
    };
    Dimensions.addEventListener('change', updateScreenDimensions);
  }, []);

  useEffect(() => setTitles(AppConfig.getTitles()), []);

  const SearchBar = () => {

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
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search"
          returnKeyType='done'
          placeholderTextColor={darkMode ? '#666' : '#999'}
          value={searchText}
          onChangeText={handleSearch}
        />
        <TouchableOpacity onPress={handleSearchPress}>
          <Image
            source={isTyping ? CONST.CANCEL_ICON : CONST.SEARCH_ICON}
            style={styles.searchIcon}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const ScrollableBox: React.FC = () => {

    const handleTitlePress = (title: string) => {
      setSelectedTitle((prevTitle) => (prevTitle === title ? null : title));
    };

    const scrollToRight = () => {
      scrollRef.current?.scrollToEnd({ animated: true });
    };

    return (
      <View style={phnbarstyles.totalContainer}>
        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={phnbarstyles.container}
          style={{
            flexGrow: 1,
            paddingEnd: 12,
            borderRadius: 12
          }}
          nestedScrollEnabled={true}
        >
          {titles.map((title: any, index: any) => (
            <TouchableOpacity
              key={index}
              style={[
                phnbarstyles.titleContainer,
                selectedTitle === title ? phnbarstyles.selectedTitleContainer : null,
              ]}
              onPress={() => handleTitlePress(title)}
            >
              <Text
                style={[
                  phnbarstyles.titleText,
                  selectedTitle === title ? phnbarstyles.selectedTitleText : null,
                ]}
              >
                {title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TouchableOpacity
          style={phnbarstyles.arrowContainer}
          onPress={scrollToRight}>
          <Image
            source={CONST.ARROW_WITH_BG_ICON}
            style={phnbarstyles.arrowBg} />
        </TouchableOpacity>
      </View>
    );
  };

  const NewFlatList: React.FC = () => {

    const handleMorePress = () => {
      setShowAllItems(true);
    };

    const renderItem = ({ item, index }: { item: { id: number; name: string; image_url: any } }) => {
      if (index === 7 && !showAllItems) {
        return (
          <TouchableOpacity
            style={[phndirectorystyles.itemContainer]}
            onPress={handleMorePress}
          >
            {!showAllItems && (
              <>
                <View style={phndirectorystyles.moreImageContainer}>
                  <Image source={CONST.MORE_DOWN_ICON} style={phndirectorystyles.imageMore} />
                </View>
                <Text style={phndirectorystyles.more}>More</Text>
              </>
            )}
          </TouchableOpacity>
        );
      }

      if (!showAllItems && index >= 7) {
        return null;
      }

      return (
        <TouchableOpacity
          style={phndirectorystyles.itemContainer}
          onPress={() => handleItemPress(item.name, item.image_url)}>
          {!showAllItems && (
            <View
              style={phndirectorystyles.imageContainer}>
              <FastImage
                source={item.image_url} style={phndirectorystyles.image}
                resizeMode={FastImage.resizeMode.contain}
                 />
            </View>
          )}
          <Text
            style={phndirectorystyles.title}
            numberOfLines={1}
            ellipsizeMode="tail">{item.name}</Text>
        </TouchableOpacity>
      );
    };

    const handleItemPress = (name: string, image_url: any) => {
      setSelectedItem({ name, image_url });
    };

    const handlePopupClose = () => {
      setSelectedItem(null);
    };

    return (
      <View style={phndirectorystyles.container}>
        <FlatList
          data={contacts}
          numColumns={4}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
        {selectedItem && (
          <PhoneDirectoryItemDetailComponent
            title={selectedItem.name}
            image={selectedItem.image_url}
            onClose={handlePopupClose}
          />
        )}
      </View>
    );
  };

  // HeaderBar component
  const HeaderBar = () => {

    return (
      <View style={headerStyle.container}>
        <TouchableOpacity onPress={handleBackIconPress}>
          <Image source={CONST.BACK_ICON} style={headerStyle.backButton} />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            source={CONST.APP_LOGO}
            style={headerStyle.appLogoWithMargin} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <HeaderBar />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: COLORS.white,
          flex: 1,
          marginEnd: 22
        }}>
        <SearchBar />
        <ScrollableBox />
        <Text style={phnbarstyles.headingContainer}>Hospital</Text>
        <NewFlatList />
      </ScrollView>
    </SafeAreaView>
  );
};

export default PhoneDirectoryDetailScreenComponents;
