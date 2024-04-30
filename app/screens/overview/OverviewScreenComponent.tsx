import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  FlatList,
  SafeAreaView,
  Modal,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { LinearGradient } from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import PhoneDirectoryItemDetailComponent from '../phoneDirectory/PhoneDirectoryItemDetailComponent';
import ChooseGoalModelComponent from '../chooseYourGoal/ChooseGoalModelcomponent';
import SideMenuComponent from '../menuBar/SideMenuBarScreenComponent';
import Carousel from 'react-native-reanimated-carousel';
import {
  carouselStyles,
  gridStyles,
  postOfTheWeekStyles,
  phoneDirectoryStyles,
  tabsStyle
} from './OverviewScreenLightStyles';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';
import { COLORS } from '../../utils/Colors';
import * as CONST from '../../utils/Constants';
import headerStyle from '../common/HeaderStyles';
import { Shadow } from 'react-native-shadow-2';
import * as IXNUtils from '../../utils/IXNUtils';
import * as AppConfig from '../../utils/AppConfig';
import FastImage from 'react-native-fast-image';
import SideMenuBarScreenContainer from '../menuBar/SideMenuBarScreenContainer';
import SideMenuBarScreenComponent from '../menuBar/SideMenuBarScreenComponent';
import LoginScreen from '../login/LoginScreenComponent';
import { headerStyles } from '../specificCategory/SpecificCategoryLightStyle';



const OverviewScreenComponent = (props: any) => {

  const {
    postsResponse,
    postsError,
    categoriesData,
    categoriesError,
    entitiesData,
    entitiesError,
    topScrollableData,
    topScrollableError,
    postOfTheWeekData,
    postOfTheweekError,
    postCategoriesData,
    postCategoriesError,
    userProfileData,
    userProfileError,
  } = props

  const navigation = useNavigation();
  const [titles, setTitles] = useState<any>([]);
  const [entities, setEntities] = useState<any>([]);
  const [filterData, setFilterData] = useState<any>([]);
  const [topScroller, setTopScroller] = useState<any>([]);
  const [postWeek, setPostweek] = useState<any>([]);
  const [postsCategories, setPostsCategories] = useState<any>([]);
  const [selectedTitle, setSelectedTitle] = useState<any>(null);
  const scrollRef = useRef<ScrollView>(null);

  const handleTitlePress = (title: any) => {
    const data: any = entities?.filter(function (item) {
      return item.category_id == selectedTitle.id;
    }).map(function ({ id, name, city, category_id }) {
      return { id, name, city, category_id };
    });
    setFilterData(data);
    setSelectedTitle((prevTitle) => (prevTitle === title ? null : title));
  };

  const scrollToRight = () => {
    scrollRef.current?.scrollToEnd({ animated: true });
  };

  useEffect(() => {
    props.postCategories();
  }, []);

  useEffect(() => {
    if (postCategoriesData && postCategoriesData.status === 'success') {
      const categories = postCategoriesData.data.data;
      AppConfig.updatePostCategories(categories);
      setPostsCategories(categories);
    }
  }, [postCategoriesData, postCategoriesError]);

  useEffect(() => {
    props.getEntities({
      latitude: 26.31577000,
      longitude: 73.11267000,
      city: "Jodhpur"
    })
  }, []);

  useEffect(() => {
    props.getScrollablePosts();
  }, []);


  useEffect(() => {
    if (topScrollableData && topScrollableData.data) {
      if (topScrollableData.status === 'success') {
        setTopScroller(topScrollableData.data);
      }
    }
  }, [topScrollableData, topScrollableError]);

  useEffect(() => {
    props.getPostOfTheWeeks();
  }, []);

  useEffect(() => {
    if (postOfTheWeekData && postOfTheWeekData.data) {
      if (postOfTheWeekData.status === 'success') {
        setPostweek(postOfTheWeekData.data);
      }
    }
  }, [postOfTheWeekData, postOfTheweekError]);

  useEffect(() => {
    //props.getPost()
  }, []);

  useEffect(() => {
    handleEntitiesData();
  }, [entitiesData, entitiesError]);

  useEffect(() => {
    handlePostsData();
  }, [postsResponse, postsError]);

  const handlePostsData = () => {
    if (postsResponse) {
    }
  }

  useEffect(() => {
    props.getCategories()
  }, []);

  useEffect(() => {
    handleCategoriesData()
  }, [categoriesData, categoriesError]);

  useEffect(() => {
    if (userProfileData) {
      if (userProfileData.status === 'success') {
        handleProfileIconPress();
      }
    }
    if (userProfileError) {
      if (userProfileError.status === 'error') {
        IXNUtils.setStringIntoKeychain(CONST.SA_TOKEN)
        IXNUtils.setStringIntoKeychain(CONST.ACCESS_TOKEN)

        handleProfileIconPress()
      }
    }
  }, [userProfileData, userProfileError]);

  const handleEntitiesData = () => {
    if (entitiesData && entitiesData.data) {
      setFilterData(entitiesData.data.entities);
      setEntities(entitiesData.data.entities);
    }
  }

  const handleCategoriesData = () => {
    if (categoriesData && categoriesData.data) {
      const data = categoriesData.data.map(function (item: { slung: any; id: any; }) {
        return {
          name: item.slug,
          id: item.id,
        }
      });
      setTitles(data);
      setSelectedTitle(data[0]);
      AppConfig.updateTitles(data);
    }
  }

  const handleProfileIconPress = async () => {
    const saToken: any = await IXNUtils.getStringFromKeychain(CONST.SA_TOKEN);
    const token: any = await IXNUtils.getStringFromKeychain(CONST.ACCESS_TOKEN);
    if (saToken && saToken.length && token && token.length) {
      AppConfig.updateToken(token);
      AppConfig.updateSAtoken(saToken);
      navigation.navigate('UserProfile');
    } else {
      navigation.navigate('LoginScreen');
    }
  };

  const PhoneDirectoryTabs: React.FC = () => {

    return (
      <View style={{ flexGrow: 1 }}>
        <View style={tabsStyle.phoneDirectoryContainer}>
          <Text style={tabsStyle.phoneDirectoryText}>PHONE DIRECTORY</Text>
        </View>
        <View style={tabsStyle.topHeader}>
          <ScrollView
            ref={scrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={tabsStyle.container}
            style={{
              flexGrow: 1,
              marginLeft: 8,
              paddingEnd: 12,
              marginEnd: 14,
              borderRadius: 12,
            }}
            nestedScrollEnabled={true}
          >
            {titles.map((item: any, index: any) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    tabsStyle.titleContainer,
                    selectedTitle.name === item.name ? tabsStyle.selectedTitleContainer : null,
                  ]}
                  onPress={() => handleTitlePress(item)}
                >
                  <Text
                    style={[
                      tabsStyle.titleText,
                      selectedTitle.name === item.name ? tabsStyle.selectedTitleText : null,
                    ]}
                  >{item.name}
                  </Text>
                </TouchableOpacity>
              )
            })}
          </ScrollView>
        </View>
        <TouchableOpacity
          style={tabsStyle.arrowContainer}
          onPress={scrollToRight}>
          <Image
            source={CONST.ARROW_WITH_BG_ICON}
            style={tabsStyle.arrowBg} />
        </TouchableOpacity>
      </View>
    );
  };

  const PhoneDirectoryList: React.FC = () => {

    const [selectedItem, setSelectedItem] = useState(null);

    const phoneDirectoryItem = ({ item }: { item: { id: number; name: string; image_url: any } }) => (

      <TouchableOpacity
        style={phoneDirectoryStyles.itemContainer}
        onPress={() => handleItemPress(item.name)}>
        <Shadow
          distance={4}
          style={{
            marginStart: 0.5,
            marginBottom: 2,
          }}>
          <FastImage
            source={{ uri:item.image_url }}
            style={phoneDirectoryStyles.image}
          />

        </Shadow>
        <Text
          style={phoneDirectoryStyles.title}>{item.name.length > 15 ? item.name.substring(0, 12) : item.name}</Text>
      </TouchableOpacity>
    );

    const handleItemPress = (name: string, image_url: any) => {
      if (name === 'More Contacts') {
        navigation.navigate('PhoneDirectoryScreen');
      } else {
        setSelectedItem({ name, image_url });
      }
    };

    const handlePopupClose = () => {
      setSelectedItem(null);
    };

    const entitiesWithMoreContacts = [...filterData, { name: 'More Contacts', image_url: CONST.MORE_ICON }];

    return (
      <View style={phoneDirectoryStyles.container}>
        <FlatList
          data={entitiesWithMoreContacts}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={phoneDirectoryItem}
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

  const PostOfTheWeekCards: React.FC = () => {

    const handleGridItemPressPOW = () => {
      navigation.navigate('BloggingScreen');
    };

    const renderItem = ({ item }: { item: { id: number; title: string; image: any } }) => (

      <TouchableOpacity onPress={() => {
        AppConfig.updateSelectedPost(item)
        handleGridItemPressPOW()
      }}>
        <View style={postOfTheWeekStyles.itemContainer}>
          <View style={postOfTheWeekStyles.item}>
            <FastImage source={{
              uri: item.image
            }}
              style={postOfTheWeekStyles.image} />
            <LinearGradient
              colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']}
              style={postOfTheWeekStyles.titleContainer}
            >
              <Text
                numberOfLines={1}
                style={postOfTheWeekStyles.title}>{item.title}</Text>
            </LinearGradient>
          </View>
        </View>
      </TouchableOpacity>
    );

    const scrollRef = useRef<FlatList>(null);

    const scrollToRight = () => {
      scrollRef.current?.scrollToEnd({ animated: true });
    };

    return (
      <View style={{ flexGrow: 1 }}>
        <View style={postOfTheWeekStyles.headingContainer}>
          <Text style={postOfTheWeekStyles.heading}>POST OF THE WEEK</Text>
        </View>
        <View style={postOfTheWeekStyles.Header}>
          <FlatList
            ref={scrollRef}
            horizontal
            style={{
              paddingHorizontal: 10,
              paddingVertical: 10,
              backgroundColor: COLORS.primaryBgColor,
              borderTopRightRadius: 8,
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8
            }}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={postOfTheWeekStyles.itemContainer}
            data={postWeek}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            removeClippedSubviews={true}
          />
        </View>
        <TouchableOpacity onPress={scrollToRight} style={postOfTheWeekStyles.arrowContainer}>
          <Image source={CONST.ARROW_ICON} />
        </TouchableOpacity>
      </View>
    );
  };

  const GridView: React.FC = () => {

    const handleGridItemPress = (title: string, id: string) => {
      console.log(`Pressed grid item: ${title}`);
      navigation.navigate('SpecificCategoryScreen');
    };

    const renderItem = ({ item }: { item: { id: number; title: string; image: any } }) => (
      <TouchableOpacity onPress={() => handleGridItemPress(item.name, item.id)}>
        <View style={gridStyles.gridItemContainer}>
          <View style={gridStyles.gridItem}>
            <FastImage
              source={{
                uri: item.image_url
              }}
              style={gridStyles.image} />
            <LinearGradient
              colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']}
              style={gridStyles.titleContainer}
            >
              <Text style={gridStyles.title}>{item.name}</Text>
            </LinearGradient>
          </View>
        </View>
      </TouchableOpacity>
    );

    return (
      <View style={gridStyles.gridContainer}>
        <FlatList
          data={postsCategories}
          numColumns={2}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    );
  };

  const TopPages = () => {

    const [activeIndex, setActiveIndex] = useState(0);
    const handleItemPress = (title: string) => {
      navigation.navigate('BloggingScreen', title);
    };

    const renderCarouselItem = ({ item, index }: { item: any, index: any }) => (
      <TouchableOpacity onPress={() => {
        AppConfig.updateSelectedPost(item)
        handleItemPress(item.title)
      }}>
        <View style={carouselStyles.carouselItemContainer}>
          <FastImage
            source={{
              uri: item.image
            }}
            style={carouselStyles.carouselItemImage} />
          <LinearGradient
            colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']}
            style={carouselStyles.carouselItemTitleContainer}
          >
            <Text numberOfLines={1} style={carouselStyles.carouselItemTitle}>{item.title}</Text>
          </LinearGradient>
        </View>
      </TouchableOpacity>
    );

    const onSnapToItem = (index: React.SetStateAction<number>) => {
      setActiveIndex(index);
    };

    const renderIndicator = () => (
      <View style={carouselStyles.indicatorContainer}>
        {topScroller.map((_, index) => (
          <View
            key={index}
            style={[
              carouselStyles.indicator,
              index === activeIndex && carouselStyles.indicatorActive,
            ]}
          />
        ))}
      </View>
    );

    return (
      <View>
        {renderIndicator()}
        <Carousel
          loop
          width={wp(100)}
          height={hp(18.03)}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.9,
            parallaxScrollingOffset: wp(20),
            parallaxAdjacentItemScale: 0.8
          }}
          enableSnap={true}
          pagingEnabled={true}
          windowSize={5}
          data={topScroller}
          scrollAnimationDuration={1000}
          onSnapToItem={onSnapToItem}
          renderItem={renderCarouselItem}
        />
      </View>
    );
  };

  //header start
  const AppToolBar: React.FC = () => {

    const [isModalVisible, setModalVisible] = useState(false);
    const [isMenuVisible, setMenuVisible] = useState(false);
    const [isLoginModalVisible, setLoginModalVisible] = useState(false);

    const handleMenuIconPress = () => {
      setMenuVisible(true);
    };

    const handleProfileIconPress = () => {
      setLoginModalVisible(true);
    };


    const handleLogoPress = () => {
      setModalVisible(true);
    };
    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };
    const toggleMenu = () => {
      setMenuVisible(!isMenuVisible);
    };

    const toggleLoginModal = () => {
      setLoginModalVisible(!isLoginModalVisible);
    };

    const handleCloseModal = () => {
      setModalVisible(false);
    }


    return (
      <View style={headerStyle.container}>
        <TouchableOpacity onPress={handleMenuIconPress}>
          <Image source={CONST.HAMBERGER_ICON} style={headerStyle.menuIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogoPress}>
          <Image source={CONST.APP_LOGO} style={headerStyle.appLogo} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleProfileIconPress}>
          <Image source={CONST.PROFILE_ICON} style={headerStyle.profileIcon} />
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={false}
          visible={isModalVisible}
          onRequestClose={toggleModal}
        >
          <ChooseGoalModelComponent
            title="Default Title"
            image={CONST.DEFAULT_IMAGE}
            onClose={toggleModal}
          />
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isLoginModalVisible}
          onRequestClose={toggleLoginModal}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <View style={headerStyle.modalContent}>
              <LoginScreen onClose={toggleLoginModal} />
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isMenuVisible}
          onRequestClose={toggleMenu}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <View style={headerStyle.modalContent}>
              <SideMenuComponent
                onClose={toggleMenu} />
            </View>
          </View>
        </Modal>
      </View>

    );
  };

  const handlePopupClose = () => {
    console.log('handlePopupClose tap')
  }

  return (

    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>

      <View >

        <AppToolBar />

        <ScrollView
          contentContainerStyle={{ paddingBottom: 60 }}
          showsVerticalScrollIndicator
          nestedScrollEnabled={true}
          bounces={false}
        >

          <TopPages />

          <PhoneDirectoryTabs />

          <PhoneDirectoryList />

          <PostOfTheWeekCards />

          <GridView />

        </ScrollView >

      </View>

    </SafeAreaView>
  );
};

export default OverviewScreenComponent;
