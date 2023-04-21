import React from "react";
import { Layout, Text } from "@ui-kitten/components";
import { fontFamily, moderateScale, textScale } from "../../constants";
import { FlatList, RefreshControl, TouchableOpacity } from "react-native";
import navigationString from "../../utils/navigationString";
import { chatStyles } from "../../styles";
import { formatData } from "../../utils";
import FastImage from "react-native-fast-image";
import { API_IMAGE } from "../../services/urls";

let _ = require("lodash");

interface IMovie {
    data: Array<any>;
    setRefresh: Function;
    refresh: boolean;
    navigation: any;
    numColumns: number
}

const MovieList = (props: IMovie) => {
    let { data, setRefresh, refresh, navigation, numColumns } = props || {};

    let { text, mycard, subText } = chatStyles || {};

    const RenderCard = ({ item, index }: any) => {
        let { empty, title, poster_path } = item || {};
        if (!!empty) return <Layout style={{ ...mycard, backgroundColor: 'transparent' }} />;
        return (
            <TouchableOpacity key={index} onPress={() => {
                navigation.navigate(navigationString.DETAILSCREEN, { ...item });
            }}>
                <FastImage
                    style={{
                        resizeMode: "contain",
                        height: moderateScale(200),
                        width: moderateScale(110),
                        borderRadius: moderateScale(16),
                        overflow: "hidden",
                        zIndex: 1
                    }}
                    source={{ uri: `${API_IMAGE}` + `${poster_path}` }}
                />
                <Layout style={{ ...mycard, borderTopLeftRadius: 0, borderTopRightRadius: 0, marginTop: -16, flex: 1 }} level="2">
                    <Layout level="2">
                        <Text style={{ ...text, fontFamily: fontFamily.helveticaMedium }}>{title}</Text>
                    </Layout>
                </Layout>

            </TouchableOpacity>
        )
    }

    return (
        <Layout style={{ flex: 1 }}>
            <FlatList
                data={formatData(data, numColumns)}
                refreshControl={
                    <RefreshControl
                        refreshing={refresh}
                        onRefresh={() => {
                            setTimeout(() => setRefresh((r: boolean) => !r), 1000);
                        }}
                    />
                }
                listKey={'A'}
                showsVerticalScrollIndicator={false}
                numColumns={numColumns}
                columnWrapperStyle={{ justifyContent: "space-between", paddingHorizontal: moderateScale(16), paddingVertical: moderateScale(8) }}
                ListHeaderComponent={() => {
                    return (
                        <Text style={{ fontFamily: fontFamily.proximaBold, fontSize: textScale(18), alignSelf: "flex-start", margin: moderateScale(16) }}>
                            {`What's Popular 🎬 `}
                        </Text>
                    )
                }}
                ListEmptyComponent={() => {
                    return (
                        <Text style={{ fontFamily: fontFamily.proximaBold, fontSize: textScale(20), alignSelf: "center", paddingVertical: "50%" }}>{`Let's Start!!!! 🎬 `}</Text>
                    )
                }}
                renderItem={({ item, index }) => { return <RenderCard item={item} index={index} /> }}
                keyExtractor={(item) => item?.title}
            />
        </Layout>
    )
}

export default MovieList;