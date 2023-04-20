import React from "react";
import { Layout, Text } from "@ui-kitten/components";
import { fontFamily, moderateScale, textScale } from "../../constants";
import { FlatList, RefreshControl, TouchableOpacity } from "react-native";
import navigationString from "../../utils/navigationString";
import { chatStyles } from "../../styles";

let _ = require("lodash");

interface IMovie {
    data: Array<any>;
    onClick: Function;
    setRefresh: Function;
    refresh: boolean;
    navigation: any;
}

const MovieList = (props: IMovie) => {
    let { data, onClick, setRefresh, refresh, navigation } = props || {};

    let { text, mycard, subText } = chatStyles || {};

    const RenderCard = ({ item, index }: any) => {
        let { name, uid, status } = item || {};

        return (
            <TouchableOpacity key={index} onPress={() => {
                navigation.navigate(navigationString.DETAILSCREEN, {
                    name, uid,
                });
            }}>
                <Layout style={mycard} level="2">
                    <Layout level={"4"} style={{ height: 40, width: 40, borderRadius: 100, marginRight: 16 }}>
                        <Text style={{ fontFamily: fontFamily.helveticaBold, fontSize: moderateScale(12), alignSelf: "center", paddingVertical: moderateScale(12), textTransform: "capitalize" }}>{name}</Text>
                    </Layout>
                    <Layout level="2">
                        <Text style={{ ...text, fontFamily: fontFamily.helveticaMedium }}>{name}</Text>
                    </Layout>
                </Layout>
            </TouchableOpacity>
        )
    }

    return (
        <Layout style={{ flex: 1 }}>
            <FlatList
                data={data}
                refreshControl={
                    <RefreshControl
                        refreshing={refresh}
                        onRefresh={() => {
                            setTimeout(() => setRefresh((r: boolean) => !r), 1000);
                        }}
                    />
                }
                numColumns={3}
                columnWrapperStyle={{ justifyContent: "space-between", padding: moderateScale(16) }}
                ListHeaderComponent={() => {
                    return (
                        <Text style={{ fontFamily: fontFamily.proximaBold, fontSize: textScale(18), alignSelf: "flex-start", marginHorizontal: moderateScale(16), marginBottom: moderateScale(16) }}>
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
                keyExtractor={(item) => item?.uid}
            />
        </Layout>
    )
}

export default MovieList;