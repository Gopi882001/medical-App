import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Modal,
  Dimensions,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FONTS } from '../../utils/Fonts';
import { COLORS } from '../../utils/Colors';
import RNPickerSelect from 'react-native-picker-select';
import * as CONST from '../../utils/Constants';
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get('window');

interface ChooseGoalModelComponentProps {
  title: string;
  image: any;
  onClose: () => void;
}
const ChooseGoalModelComponent: React.FC<ChooseGoalModelComponentProps> = ({ title, image, onClose }) => {
  const [age, setAge] = useState<string>('');

  const closeModal = () => {
    onClose();
  };
  const onDonePress = () => {
    onClose();
  };

  const [goal, setGoal] = useState("");
  const goals = ["Gain", "Muscles", "Yoga", "Weight Loss"];

  const onAgeChange = (text: string) => {
    setAge(text);
  };
  const modalWidth = wp('82%');
  const modalHeight = hp('58%');
  const [darkMode, setDarkMode] = useState(false);

  const onCheckLimit = (value: string) => {
    const updatedValue = Number.parseInt(value)
    if (Number.isNaN(updatedValue)) {
      setAge('0')
    } else if (updatedValue > 100) {
      setAge('100')
    } else {
      setAge(updatedValue.toString())
    }
  }
  return (
    <Modal visible={true} animationType="fade" transparent>
      <View style={styles.modalContainer}>
        <View style={[styles.modalContent, { width: modalWidth, height: modalHeight }, Platform.OS === 'android' && styles.androidModalContent]}>
          <LinearGradient
            colors={['rgba(140,201,239,255)', 'rgba(204, 233, 248, 255)', 'rgba(140, 201, 239, 255)']}
            style={styles.modalContent}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
          />
          <View style={[styles.modalContent, Platform.OS === 'android' && styles.androidModalContent]}>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Image source={CONST.CLOSE_BLACK_ICON} style={image} />
            </TouchableOpacity>
            <Text style={styles.title}>AGE</Text>
            <TextInput
              style={[styles.input, Platform.OS === 'android' && styles.androidtextsize, { color: darkMode ? '#FFF' : '#000' }]}
              placeholder="00"
              placeholderTextColor={darkMode ? '#666' : '#999'}
              value={age}
              keyboardType='number-pad'
              returnKeyType='done'
              onChangeText={(newValue) => onCheckLimit(newValue)}
            />
            <View style={styles.lineContainer}>
              <View style={[styles.line, Platform.OS === 'android' && styles.androidLine]} />
            </View>
            <View style={styles.chooseGoalContainer}>
              <Text style={styles.layout}>CHOOSE  YOUR</Text>
              <Text style={styles.layout}>GOAL</Text>
            </View>
            <View style={styles.spinnerContainer}>
              <Image source={CONST.GREEN_BG_IMAGE} style={styles.image} />
              <RNPickerSelect
                onValueChange={(value) => setGoal(value)}
                items={[
                  { label: goals[0], value: goals[0] },
                  { label: goals[1], value: goals[1] },
                  { label: goals[2], value: goals[2] },
                  { label: goals[3], value: goals[3] },
                ]}
                value={goal}
                useNativeAndroidPickerStyle={false}
                style={{
                  inputAndroid: {
                    ...styles.pickerInput,
                    textAlign: 'center',
                  },
                  inputIOS: {
                    ...styles.pickerInput,
                    textAlign: 'center',
                  },
                  modalViewMiddle: { justifyContent: 'flex-end' },
                  chevronContainer: { display: 'none' }
                }}
              />
            </View>
            <TouchableOpacity style={styles.doneButton} onPress={onDonePress}>

              <Image source={CONST.DONE_BUTTON} />
            </TouchableOpacity>
          </View>
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
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 40,
    fontFamily: FONTS.poppinsSemiBold,
    alignItems: 'center',
    color: 'black',
    left: 3
  },
  image: {
    width: 240,
    height: 40,
    left: 200
  },
  polygon: {
    position: 'absolute',
    width: 15,
    height: 17,
    backgroundColor: 'white',
    right: 16,
  },
  layout: {
    fontSize: wp('6.5%'),
    fontFamily: FONTS.poppinsSemiBold,
    color: '#9000FF',
    marginBottom: hp('0.5%'),
  },
  closeButton: {
    position: 'absolute',
    backgroundColor: 'transparent',
    padding: 20,
    top: 0,
    left: 0,
  },
  backgroundImage: {
    position: 'absolute',
    width: wp('75%'),
    height: hp('54%'),
    backgroundColor: 'rgba(202,232,2448,255)',
    borderRadius: wp('8%')
  },
  modalContent: {
    position: 'absolute',
    paddingBottom: hp('1.6%'),
    paddingStart: wp('1.6%'),
    paddingTop: hp('1.6%'),
    paddingEnd: wp('0.6%'),
    padding: wp('4%'),
    borderRadius: wp('8%'),
    width: wp('75%'),
    height: hp('46%'),
    alignContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  input: {
    fontSize: 26,
    color: '#1D288B'
  },
  lineContainer: {
    marginBottom: 2,
  },
  androidtextsize: {
    fontSize: 32,
  },
  androidLine: {
    marginTop: -18,
    height: 1.6,
    width: 80
  },
  spinnerContainer: {
    flexDirection: 'row',
    marginHorizontal: 22,
    marginBottom: 12,
    borderRadius: 8,
    padding: 2,
    right: 16,
    justifyContent: 'center',
    alignItems: 'center',
    top: 4
  },
  pickerInput: {
    textAlign: 'center',
    justifyContent: 'center',
    fontFamily: FONTS.montserratBold,
    fontSize: 20,
    color: COLORS.white,
    height: 45,
    width: 240,
    right: 38,
    bottom: 3
  },
  pickerAndroidInput: {
    textAlign: 'center',
    justifyContent: 'center',
    fontFamily: FONTS.montserratBold,
    fontSize: 40,
    color: COLORS.white,
    height: 55,
    width: 240
  },
  chooseGoalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneButton: {
    position: 'relative',
    width: 136,
    height: 40,
    borderRadius: 6,
    alignSelf: 'center',
    marginTop: 16,
    justifyContent: 'center',
    left: -4
  },
  doneText: {
    color: COLORS.white,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 22,
    fontFamily: FONTS.montserratBold
  },
  line: {
    width: 80,
    height: 1,
    backgroundColor: 'black',
    marginBottom: 2,
  },
  androidModalContent: {
    height: hp('43%'),
    marginBottom: 10,
    position: 'absolute',
    paddingBottom: hp('1.6%'),
    paddingStart: wp('1.6%'),
    paddingTop: hp('1.6%'),
    paddingEnd: wp('0.6%'),
    padding: wp('4%'),
    borderRadius: wp('8%'),
    width: wp('75%'),
    alignContent: 'center',
    alignItems: 'center',
  },
});
export default ChooseGoalModelComponent;
