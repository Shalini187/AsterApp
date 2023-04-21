import { StyleSheet } from "react-native";
import { fontFamily, moderateScale, moderateScaleVertical, textScale, width } from "../constants";

export const imageStyle = StyleSheet.create({
    container: {
        flex: 1,
        margin: 16,
        bottom: 100,
        borderRadius: 30,
        position: 'absolute',
        backgroundColor: 'tansparent',
        width: width,
    },
    card: {
        flex: 1,
        width: 300,
        margin: 12,
        padding: 16,
        flexWrap: 'wrap',
        borderRadius: 20,
        flexDirection: 'row',
    },
});

export const flexStyle = StyleSheet.create({
    container: {
        bottom: 0,
        position: 'absolute',
        width: '100%',
        height: 90,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    containerCircle: {
        backgroundColor: 'red',
        height: 60,
        width: 60,
        bottom: 48,
        padding: 2,
        position: 'absolute',
        borderRadius: 100,
        alignItems: 'center'
    },
    circle: {
        alignItems: 'center',
        padding: 24
    },
    option: {
        height: 40,
        margin: 8,
        borderRadius: 100,
        alignContent: 'center',
        justifyContent: "center"
    }
});

export const searchStyle = StyleSheet.create({
    centeredView: {
        flex: 1,
        width: '100%',
        marginTop: moderateScale(54),
        borderRadius: 30,
        position: 'absolute',
        flexDirection: 'row',
    },
    buttonSearch: {
        right: '100%'
    },
    buttonClose: {
        top: '4%',
        right: '280%',
    },
    input: {
        width: '100%',
        fontSize: textScale(13),
        fontFamily: fontFamily.proximaMedium,
        borderRadius: moderateScale(8),
        borderColor: '#000',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});


export const loginStyles = StyleSheet.create({
    text: {
        fontSize: textScale(22),
        margin: 10
    },
    img: {
        width: 200,
        height: 200,
        borderRadius: moderateScale(24)
    },
    box1: {
        alignItems: "center",
        paddingBottom: moderateScaleVertical(16)
    },
    box2: {
        paddingHorizontal: moderateScaleVertical(40),
        justifyContent: "space-evenly",
        height: "50%"
    }
});

export const movieStyles = StyleSheet.create({
    text: {
        fontSize: textScale(14),
        textTransform: "capitalize",
        fontFamily: fontFamily.helveticaMedium
    },
    gridStyle: {
        justifyContent: "space-between",
        paddingHorizontal: moderateScale(16),
        paddingVertical: moderateScale(8)
    },
    imageStyle: {
        resizeMode: "contain",
        height: moderateScale(200),
        width: moderateScale(110),
        borderRadius: moderateScale(16),
        overflow: "hidden",
        zIndex: 1
    },
    headText: {
        fontSize: textScale(18),
        alignSelf: "flex-start",
        margin: moderateScale(16),
        fontFamily: fontFamily.proximaBold
    },
    footText: {
        fontSize: textScale(20),
        alignSelf: "center",
        paddingVertical: "50%",
        fontFamily: fontFamily.proximaBold
    },
    mycard: {
        paddingTop: moderateScaleVertical(24),
        borderRadius: moderateScale(16),
        marginTop: moderateScale(-16),
        padding: moderateScale(8),
        width: moderateScale(110),
        justifyContent: "flex-end",
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        alignItems: "center",
        flex: 1
    }
});

