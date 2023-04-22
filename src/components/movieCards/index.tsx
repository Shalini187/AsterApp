import React from "react";
import { Layout, Spinner, Text } from "@ui-kitten/components";
import { FlatList, RefreshControl, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import navigationString from "../../utils/navigationString";
import { movieStyles } from "../../styles";
import { API_IMAGE } from "../../services/urls";
import { useSelector } from "react-redux";

let _ = require("lodash");

interface IMovie {
    data: Array<any>;
    setRefresh?: Function;
    refresh?: boolean;
    navigation: any;
    numColumns: number;
    endReach: any;
    onClick: Function
}

const MovieList = (props: IMovie) => {
    let { onClick, endReach, data, setRefresh = () => { }, refresh = false, navigation, numColumns } = props || {};
    let { text, mycard, gridStyle, headText, footText, footerCon, imageStyle, footerText_ } = movieStyles || {};

    const { isListEnd, moreLoading } = useSelector((state: any) => state.api);

    const windowSize = data?.length > 50 ? data?.length / 4 : 21;

    const RenderCard = ({ item, index }: any) => {
        let { title, poster_path } = item || {};
        return (
            <TouchableOpacity key={index} onPress={() => {
                onClick();
                navigation.navigate(navigationString.DETAILSCREEN, { ...item });
            }}>
                <FastImage
                    style={imageStyle}
                    source={{ uri: `${API_IMAGE}` + `${poster_path}`, cache: FastImage.cacheControl.immutable }}
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
                data={data}
                listKey={'_' + Math.random().toString(36).substr(2, 9)}
                numColumns={numColumns}
                columnWrapperStyle={gridStyle}
                keyExtractor={(_, index) => String(index)}
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
                ListFooterComponent={() => {
                    return (
                        <Layout style={footerCon}>
                            {moreLoading && <Spinner />}
                            {isListEnd && <Text style={footerText_}>No more articles at the moment</Text>}
                        </Layout>
                    )
                }}
                disableVirtualization={true}
                onEndReachedThreshold={0.6}
                onEndReached={endReach}
                maxToRenderPerBatch={windowSize}
                windowSize={windowSize}

            />
        </Layout>
    )
}

export default MovieList;