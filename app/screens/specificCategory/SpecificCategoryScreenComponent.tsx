import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  FlatList,
  Dimensions,
  ScrollView,
  Animated,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import Carousel from 'react-native-reanimated-carousel';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { headerStyles, carouselstyles } from './SpecificCategoryLightStyle';
import { COLORS } from '../../utils/Colors';
import { FONTS } from '../../utils/Fonts';
import { Platform } from 'react-native';
import headerStyle from '../common/HeaderStyles';
import * as CONST from '../../utils/Constants';

const HeaderBar = () => {

  const navigation = useNavigation();

  const handleBackButtonPress = () => {
    navigation.goBack()
  };

  const handleProfileIconPress = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={headerStyle.container}>
      <TouchableOpacity onPress={handleBackButtonPress}>
        <Image
          source={CONST.BACK_ICON}
          style={headerStyle.backButton}
        />
      </TouchableOpacity>

      <Image
        source={CONST.APP_LOGO}
        style={headerStyle.appLogoWithMargin}
      />
    </View>
  );
};

const CustomCarousel = () => {
  const carouselData = [
    { id: 1, title: 'HEALTH TIPS', image: CONST.DEFAULT_IMAGE },
    { id: 2, title: 'GYM TIPS', image: CONST.DEFAULT_IMAGE },
    { id: 3, title: 'NUTRITION TIPS', image: CONST.DEFAULT_IMAGE },
    { id: 4, title: 'DIET TIPS', image: CONST.DEFAULT_IMAGE },
    { id: 5, title: 'WORK', image: CONST.DEFAULT_IMAGE },
  ];
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePaginationPress = (index) => {
    setActiveIndex(index);
  };

  const renderCarouselItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => { }}>
      <View style={carouselstyles.carouselItemContainer}>
        <Image source={item.image} style={carouselstyles.carouselItemImage} />
        <LinearGradient
          colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']}
          style={carouselstyles.carouselItemTitleContainer}
        >
          <Text style={carouselstyles.carouselItemTitle}>{item.title}</Text>
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );

  const renderPagination = () => (
    <View style={carouselstyles.paginationContainer}>
      {carouselData.map((_, index) => (
        <TouchableOpacity
          key={index}
          style={[
            carouselstyles.paginationDot,
            activeIndex === index ? carouselstyles.paginationDotActive : null,
          ]}
          onPress={() => handlePaginationPress(index)}
        />
      ))}
    </View>
  )

  return (
    <View>
      <Carousel
        loop
        width={wp(100)}
        height={hp(18.03)}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: wp(20),
          parallaxAdjacentItemScale: 0.8,
        }}
        enableSnap={true}
        pagingEnabled={true}
        windowSize={5}
        //autoPlay={true}
        data={carouselData}
        scrollAnimationDuration={1000}
        activeIndex={activeIndex}
        onSnapToItem={(index) => setActiveIndex(index)}
        renderItem={renderCarouselItem}
      />
      {renderPagination()}
    </View>
  );
};

const Card = ({ title, image }) => {
  return (

    <View style={styles.cardContainer}>
      <Text style={styles.cardTitle}>{title}</Text>
      <View style={{
        shadowColor: COLORS.black,
        width: '100%',
        height: 140,
        borderRadius: 10,
        elevation: 4,
        shadowOpacity: 1,
      }}>
        <Image source={image} style={styles.cardImage} />
        <LinearGradient
          colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']}
          style={styles.cardImageGradient}
        />
      </View>
    </View>
  );
};

const SpecificCategoryScreenComponent = () => {
  const cardData = [
    { id: 1, title: 'WARM UPS BEFORE HOME WORKOUT', image: CONST.DEFAULT_IMAGE },
    { id: 2, title: 'DIET PLAN FOR HOME WORKOUT', image: CONST.DEFAULT_IMAGE },
    { id: 3, title: 'MISTAKES', image: CONST.DEFAULT_IMAGE },
    // Add more cards as needed
  ];

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar />
      <ScrollView >
        <View style={headerStyles.carouselContainer}>
          <View style={headerStyles.headingContainer}>
            <Text style={headerStyles.heading}>HOME WORKOUT</Text>
          </View>
          <View style={styles.pagerContainer}>
            <CustomCarousel />
          </View>
        </View>
        <View style={styles.cardScrollContainer}>
          {cardData.map((card) => (
            <Card key={card.id} title={card.title} image={card.image} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLORS.white
  },
  cardScrollContainer: {
    marginTop: 24,
    paddingBottom: 16,
  },
  cardContainer: {
    backgroundColor: COLORS.primaryBgColor,
    borderRadius: 12,
    marginBottom: 22,
    alignContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 14,
    marginTop: 2,
    elevation: 4,
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    marginStart: 16,
    marginEnd: 16,
  },
  cardImage: {
    width: '100%',
    height: 140,
    borderRadius: 10,
  },
  cardImageGradient: {
    height:30,
    position: 'absolute',
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderRadius: 12,
  },
  cardTitle: {
    fontSize: 17,
    fontFamily: FONTS.poppinsSemiBold,
    color: COLORS.black,
  },

  pagerContainer: {
    width: wp('100%'),
    marginLeft: -16,
  },
});

export default SpecificCategoryScreenComponent;
