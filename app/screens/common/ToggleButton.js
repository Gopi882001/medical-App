import * as React from 'react';
import {
    Animated,
    Easing,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import PropTypes from 'prop-types';
import { FONTS } from '../../utils/Fonts';
import { COLORS } from '../../utils/Colors';

const Toggle = props => {
    const animatedValue = new Animated.Value(0);

    const moveToggle = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-14, 18],
    });

    const { isOn, onColor, offColor, style, onToggle, labelStyle, label } = props;

    const color = isOn ? onColor : offColor;

    animatedValue.setValue(isOn ? 0 : 1);

    Animated.timing(animatedValue, {
        toValue: isOn ? 1 : 0,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: false,
    }).start();

    return (
        <View style={styles.container}>
            {!!label && <Text style={[styles.label, labelStyle]}>{label}</Text>}

            <TouchableOpacity onPress={typeof onToggle === 'function' && onToggle}>
                <View style={[styles.toggleContainer, style, { backgroundColor: color }]}>
                    <Animated.View
                        style={[
                            styles.toggleWheelStyle,
                            {
                                marginLeft: moveToggle,
                            },
                        ]}
                    />
                </View>
            </TouchableOpacity>
        </View>
    );
};

Toggle.propTypes = {
    onColor: PropTypes.string,
    offColor: PropTypes.string,
    label: PropTypes.string,
    onToggle: PropTypes.func,
    style: PropTypes.object,
    isOn: PropTypes.bool.isRequired,
    labelStyle: PropTypes.object,
};

Toggle.defaultProps = {
    onColor: '#4cd137',
    offColor: '#A7A7A7',
    label: '',
    onToggle: () => { },
    style: {},
    isOn: false,
    labelStyle: {},
};

export default Toggle;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    toggleContainer: {
        width: 50,
        height: 30,
        marginLeft: 3,
        borderRadius: 15,
        justifyContent: 'center',
    },
    label: {
        marginRight: 2,
    },
    toggleWheelStyle: {
        width: 25,
        height: 24,
        backgroundColor: 'white',
        borderRadius: 12,
        shadowColor: '#0000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 4,
    },
});
