import React from "react";
import { Layout, Text } from "@ui-kitten/components";
import { FlatList, RefreshControl, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import navigationString from "../../utils/navigationString";
import { movieStyles } from "../../styles";
import { formatData } from "../../utils";
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

    let { text, mycard, gridStyle, headText, footText, imageStyle } = movieStyles || {};

    const RenderCard = ({ item, index }: any) => {
        let { title, poster_path } = item || {};
        return (
            <TouchableOpacity key={index} onPress={() => {
                navigation.navigate(navigationString.DETAILSCREEN, { ...item });
            }}>
                <FastImage
                    style={imageStyle}
                    source={{ uri: `${API_IMAGE}` + `${poster_path}` }}
                />
                {!!title && <Layout style={mycard} level={"2"}>
                    <Layout level="2">
                        <Text style={text}>{title}</Text>
                    </Layout>
                </Layout>}
            </TouchableOpacity>
        )
    }

    return (
        <Layout style={{ flex: 1 }}>
            <FlatList
                data={formatData(data, numColumns)}
                listKey={'A'}
                numColumns={numColumns}
                columnWrapperStyle={gridStyle}
                keyExtractor={(item) => item?.title}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={() => <Text style={headText}>{`What's Popular 🎬 `}</Text>}
                ListEmptyComponent={() => <Text style={footText}>{`Let's Start!!!! 🏃🏻‍♀️🏃🏻‍♂️`}</Text>}
                renderItem={({ item, index }) => { return <RenderCard item={item} index={index} /> }}
                refreshControl={
                    <RefreshControl
                        refreshing={refresh}
                        onRefresh={() => {
                            setTimeout(() => setRefresh((r: boolean) => !r), 1000);
                        }}
                    />
                }
                onEndReachedThreshold={0.6}
            />
        </Layout>
    )
}

export default MovieList;