import React, { useState } from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, SafeAreaView } from 'react-native';
import * as CONST from '../../utils/Constants';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native-elements';
import { getTitles } from '../../utils/AppConfig';

const FullImageScreen = ({ route }) => {

  const navigation = useNavigation();
  const { imageUrl } = route.params;
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isResized, setIsResized] = useState(false);
  const [showWhiteResizeButton, setShowWhiteResizeButton] = useState(false);

  const toggleResize = () => {
    setIsResized(!isResized);
    setIsFullScreen(false);
    setShowWhiteResizeButton(!showWhiteResizeButton);
  };
  const onBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
    <View style={styles.container}>
        <TouchableOpacity onPress={() => onBack()}>
          <Image source={CONST.BACK_ICON} style={styles.backButton} />
        </TouchableOpacity>
      <View style={styles.fullScreenButton}>
        <Image
          source={{ uri: imageUrl }}

          style={[
            isFullScreen ? styles.fullScreenImage : isResized ? styles.resizedImage : styles.image,
            isResized && styles.rotatedImage,
          ]}
        />
      </View>
      {!isFullScreen && (
        <TouchableOpacity onPress={toggleResize} style={[styles.resizeButton, isResized && styles.rotatedResizeButton]}>
          <Image
            source={
              showWhiteResizeButton
                ? CONST.RESIZE_IMAGE_WHITE
                : CONST.RESIZE_IMAGE
            }
            style={[
                styles.resizeIcon,
                isResized && styles.rotatedResizeIcon, 
              ]}
          />
        </TouchableOpacity>
      )}
    </View>
    </SafeAreaView>
  );
};

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  fullScreenButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  backButton: {
    width: 19,
    height: 28,
    top:10,
    right: 190, 
    },
  fullScreenImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  resizedImage: {
    width: height,
    height: width,
    resizeMode: 'cover',
  },
  rotatedImage: {
    transform: [{ rotate: '90deg' }],
  },
  resizeButton: {
    position: 'absolute',
    top: 580,
    right: 10,
  },
  rotatedResizeButton: {
    top: 780, 
    right: 380 
  },
  resizeIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  rotatedResizeIcon: {
    transform: [{ rotate: '90deg' }],
  },
});

export default FullImageScreen;
