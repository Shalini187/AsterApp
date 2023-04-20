import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { COLORS as colors, moderateScale, textScale, fontFamily } from '../../constants';

interface ICircular {
    percent?: number | undefined | any;
    showText?: number | string | any;
}

const CircularProgress = (props: ICircular) => {
    let { percent, showText } = props || {};
    const [firstProgressLayerStyle, setLayerStyle] = useState<any>();

    const propStyle = (percent: number, base_degrees: any) => {
        const rotateBy = base_degrees + (percent * 3.6);
        return {
            transform: [{ rotateZ: `${rotateBy}deg` }]
        };
    }

    const renderThirdLayer = (percent: number) => {
        if (percent > 50) {
            return <View style={[styles.secondProgressLayer, propStyle((percent - 50), 45)]}></View>
        } else {
            return <View style={styles.offsetLayer}></View>
        }
    }

    useEffect(() => {
        if (percent > 50) {
            setLayerStyle(propStyle(50, -135));
        } else {
            setLayerStyle(propStyle(percent, -135));
        }
    }, [percent]);


    return (
        <View style={styles.container}>
            <View style={[styles.firstProgressLayer, firstProgressLayerStyle]}></View>
            {renderThirdLayer(percent)}
            <Text style={styles.display}>{showText}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: moderateScale(40),
        height: moderateScale(40),
        borderWidth: moderateScale(4),
        borderRadius: 100,
        borderColor: colors.greyCircle_1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    firstProgressLayer: {
        width: moderateScale(40),
        height: moderateScale(40),
        borderWidth: moderateScale(4),
        borderRadius: 100,
        position: 'absolute',
        borderLeftColor: 'transparent',
        borderBottomColor: 'transparent',
        borderRightColor: colors.lightBlue,
        borderTopColor: colors.lightBlue,
        transform: [{ rotateZ: '-135deg' }]
    },
    secondProgressLayer: {
        width: moderateScale(40),
        height: moderateScale(40),
        position: 'absolute',
        borderWidth: moderateScale(4),
        borderRadius: 100,
        borderLeftColor: 'transparent',
        borderBottomColor: 'transparent',
        borderRightColor: colors.lightBlue,
        borderTopColor: colors.lightBlue,
        transform: [{ rotateZ: '45deg' }]
    },
    offsetLayer: {
        width: moderateScale(40),
        height: moderateScale(40),
        position: 'absolute',
        borderWidth: moderateScale(4),
        borderRadius: 100,
        borderLeftColor: 'transparent',
        borderBottomColor: 'transparent',
        borderRightColor: colors.greyCircle_1,
        borderTopColor: colors.greyCircle_1,
        transform: [{ rotateZ: '-135deg' }]
    },
    display: {
        position: 'absolute',
        fontSize: textScale(12),
        fontFamily: fontFamily.helveticaBold
    }
});

export default CircularProgress;
