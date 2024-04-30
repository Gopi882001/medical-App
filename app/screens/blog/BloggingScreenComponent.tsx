import React, { useEffect, useState } from 'react';
import { View, StatusBar, Image, Text, ScrollView, FlatList, SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { styles, gridStyles } from './BloggingScreenLightStyle';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../utils/Colors';
import headerStyle from '../common/HeaderStyles';
import * as CONST from '../../utils/Constants';
import * as AppConfig from '../../utils/AppConfig';
import FastImage from 'react-native-fast-image';
import { WebView } from 'react-native-webview';

const BloggingScreenComponent = () => {

  const navigation = useNavigation();
  const [post, setPost] = useState<any>([]);

  useEffect(() => {

    setPost(AppConfig.getSelectedPost())
    console.log(post.body);
  })

  const onBack = () => {
    navigation.goBack();
  };

  const onImagePress = () => {
    navigation.navigate('FullImage', { imageUrl: post.image });
  };

  return (

    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={headerStyle.container}>
        <TouchableOpacity onPress={() => onBack()}>
          <Image source={CONST.BACK_ICON} style={headerStyle.backButton} />
        </TouchableOpacity>
        <Image source={CONST.APP_LOGO} style={headerStyle.appLogo} />
        <TouchableOpacity onPress={() => console.log('Right profile icon pressed')}>
          <Image source={CONST.SHARE_ICON} style={headerStyle.shareIcon} />
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => console.log('Right profile icon pressed')}>
          <Image source={require('../../assets/bloggingasset/translation-icon.png')} style={styles.translateIcon} />
        </TouchableOpacity> */}
      </View>

      <ScrollView style={{ backgroundColor: COLORS.white }}>
        <View style={{ marginBottom: 16 }}>
          <View >
            <TouchableOpacity onPress={onImagePress}>
              <FastImage
                source={{ uri: post.image }}
                style={styles.bannerImage} resizeMode="cover"
                 />
                 
            </TouchableOpacity>
            <LinearGradient colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']} style={styles.bannerTextContainer}>
              <Text numberOfLines={1} style={styles.bannerText}>{post.title}</Text>
            </LinearGradient>
          </View>
          <View style={{ flex: 1 }}>
            <WebView
              scrollEnabled={false}
              style={styles.webview}
              source={{ uri: post.body }}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              startInLoadingState={false}
              scalesPageToFit={true} />
          </View>
          <View style={styles.gridheadingContainer}>
            <Text style={styles.gridheadingText}>RELATED TOPICS</Text>
          </View>
          <GridView />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const GridView = () => {

  const data = [
    { id: 1, title: 'MEDITATION', image: CONST.DEFAULT_IMAGE },
    { id: 2, title: 'HOME WORKOUT', image: CONST.GRID_ICON },
  ];

  const handleGridItemPress = (title: string) => {
    console.log(`Pressed grid item: ${title}`);
  };
  const renderItem = ({ item }: { item: { id: number; title: string; image: any } }) => (
    <TouchableOpacity onPress={() => handleGridItemPress(item.title)}>
      <View style={gridStyles.gridItemContainer}>
        <View style={gridStyles.gridItem}>
          <Image source={item.image} style={gridStyles.image} />
          <LinearGradient colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']} style={gridStyles.titleContainer}>
            <Text style={gridStyles.title}>{item.title}</Text>
          </LinearGradient>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={gridStyles.gridContainer}>
      <FlatList data={data} numColumns={2} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} />
    </View>
  );
};

export default BloggingScreenComponent;
