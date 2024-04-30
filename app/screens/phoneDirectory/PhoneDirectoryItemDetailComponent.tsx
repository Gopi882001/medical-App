import React from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, Image, Text, Dimensions, Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import StarRating from './StarRating';
import LinearGradient from 'react-native-linear-gradient';
import { FONTS } from '../../utils/Fonts';
import { COLORS } from '../../utils/Colors';
import * as CONST from '../../utils/Constants';

interface PhoneDirectoryItemDetailComponentProps {
  title: string;
  image: any;
  onClose: () => void;
}
const PhoneDirectoryItemDetailComponent: React.FC<PhoneDirectoryItemDetailComponentProps> = ({
  title,
  image,
  onClose,
}) => {
  const closeModal = () => {
    onClose();
};
  const onPressCall = () => {};

  const modalWidth = wp('82%');
  const modalHeight = hp('56%');
  const { width } = Dimensions.get('window');

  const responsiveFontSize = (size: number): number => {
    const ratio = size / 375; 
    return Math.round(ratio * width);
  };
  return (
    <Modal visible={true} animationType="fade" transparent>
      <View style={styles.modalContainer}>
        <View style={[styles.modalContent, { width: modalWidth, height: modalHeight }]}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0)', '#FFFFFF', 'rgba(255, 255, 255, 0)']}
            style={styles.bgGradient}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
          />
            <View style={styles.modalWrapper}>
              <LinearGradient
                colors={['rgba(173,242,249,255)', '#FFFFFF', 'rgba(173,242,249,255)']}
                style={styles.gradient}
                start={{ x: 5, y: 5 }}
                end={{ x: 5, y: 5 }}
              />
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Image source={CONST.CLOSE_BLACK_ICON} style={image} />
              </TouchableOpacity>
              <View style={styles.imageWrapper}>
                <Image source={CONST.GRID_ICON} style={styles.image} />
              </View>
                  <Text numberOfLines={2} style={{ ...styles.title, fontSize: responsiveFontSize(25), textAlign: 'center' }}>
                    {title}
                  </Text>
                  <Text numberOfLines={1} style={{ ...styles.noText, fontSize: responsiveFontSize(22) }}>
                    1234567890
                  </Text>
                  <View style={styles.starimage}>
                    <StarRating rating={3.5} maxStars={5} starSize={wp('12%')} />
                  </View>
            </View>
          <TouchableOpacity style={styles.button} onPress={onPressCall}>
            <Image source={CONST.CALL_NOW_ICON}></Image>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  gradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0,
  },
  bgGradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.5,
  },
  modalContent: {
    backgroundColor: '#9FD4F1',
    paddingBottom: hp('1.6%'),
    paddingStart: wp('1.6%'),
    paddingTop: hp('1.6%'),
    paddingEnd: wp('1.6%'),
    borderRadius: wp('7%'),
    width: wp('75%'),
    height: hp('66%'),
    alignContent: 'center',
    alignItems: 'center',
  },
  modalWrapper: {
    backgroundColor: '#cafafa',
    padding: wp('0.4%'),
    alignContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: wp('1.3%'),
    elevation: wp('1.3%'),
    width: wp('68%'),
    height: hp('43%'),
    paddingVertical: hp('2.8%'),
    borderRadius: wp('4%'),
    top: 6
  },
  title: {
    paddingVertical: hp('0.1%'),
    paddingHorizontal: wp('1.1%'),
    color: COLORS.black,
    fontFamily: FONTS.poppinsSemiBold,
    bottom: hp('1%'),
    alignItems: 'center' 
  },
  imageWrapper: {
    alignContent: 'center',
    width: wp('23%'),
    height: wp('23%'),
    borderRadius: wp('12.5%'),
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: Platform.OS == 'ios' ? 0.4 : 0.8,
    shadowRadius: wp('1.3%'),
    elevation: wp('2.7%'),
    marginBottom: wp('8%'),
  },
  image: {
    alignContent: 'center',
    width: wp('23%'),
    height: wp('23%'),
    borderRadius: 55,
  },
  closeButton: {
    position: 'absolute',
    backgroundColor: 'transparent',
    padding: wp('7%'),
    top: 0,
    left: 0,
  },
  button: {
    paddingHorizontal: wp('1%'),
    borderRadius: wp('1.3%'),
    marginTop: hp('1.3%'),
    shadowRadius: wp('1.3%'),
    top: 6
  },
  starimage: {
    bottom: 6
  },
  noText: {
    fontFamily: FONTS.poppinsMedium,
    color: '#1D288B',
    bottom: hp('1%'),
    top: 5
  },
});

export default PhoneDirectoryItemDetailComponent;
