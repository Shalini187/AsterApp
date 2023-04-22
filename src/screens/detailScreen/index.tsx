import React, { useCallback, useState } from "react";
import { Icon, Layout, Text } from "@ui-kitten/components";
import { ThemeProvider, WrapperContainer } from "../../components";
import { COLORS, fontFamily, height, hitSlop, moderateScale, textScale } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { getRequest } from "../../services/api";
import { requestAPI } from "../../redux/actions/api";
import { API_IMAGE, GET_MOVIE_BY_ID } from "../../services/urls";
import { FlatList, ImageBackground, ScrollView, TouchableOpacity } from "react-native";
import { movieStyles } from "../../styles";
import FastImage from "react-native-fast-image";
import moment from "moment";


const DetailScreen = ({ navigation, route }: any) => {
    const { id } = route?.params || {};

    const { dataById, loading } = useSelector((state: any) => state?.api);
    const dispatch: any = useDispatch();

    const [isLoading, setLoading] = useState<boolean>(true);

    console.log("dsds", dataById, loading)

    useFocusEffect(
        useCallback(() => {
            init();
        }, [])
    );

    const init = async () => {
        dispatch(requestAPI({ apiCall: getRequest, url: GET_MOVIE_BY_ID(id), id }));
        return;
    }

    const { poster_path, original_title, overview, release_date, backdrop_path, tagline, genres } = dataById || {};

    const RenderLayout = () => {
        return (
            <ScrollView overScrollMode={"never"} style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                <Layout style={{ flexDirection: "row" }}>
                    <Layout style={{ width: "30%" }}>
                        <FastImage
                            style={movieStyles.imageStyle}
                            source={{ uri: `${API_IMAGE}` + `${poster_path}`, cache: FastImage.cacheControl.immutable }}
                        />
                    </Layout>

                    <Layout style={{ width: "70%", marginLeft: moderateScale(16) }}>
                        <Layout style={{ flexDirection: "row", flexShrink: 1, }}>
                            <Text style={{ fontFamily: fontFamily.proximaBold, fontSize: textScale(24) }}>
                                {`${original_title?.trim()} ${moment(release_date)?.format("( YYYY )")}`}
                            </Text>
                        </Layout>
                        <Layout style={{ marginTop: moderateScale(16) }}>
                            <Text style={{ fontFamily: fontFamily.proximaBold, fontSize: textScale(12) }}>{tagline}</Text>
                        </Layout>
                        <Layout style={{ marginTop: moderateScale(16) }}>
                            <FlatList
                                data={genres}
                                ListHeaderComponent={() => <Text style={{ fontFamily: fontFamily.proximaBold, fontSize: textScale(14), marginBottom: moderateScale(16) }}>{"Genres"}</Text>}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(_, index) => index.toString()}
                                renderItem={({ item, index }) => (
                                    <Layout level={'4'} style={{ padding: moderateScale(16), borderRadius: moderateScale(16), marginLeft: moderateScale(8) }}>
                                        <Text style={{ fontFamily: fontFamily.proximaBold, fontSize: textScale(12) }}>{item?.name}</Text>
                                    </Layout>
                                )}
                            />
                        </Layout>
                    </Layout>

                </Layout>
                <Layout style={{ marginTop: moderateScale(16) }}>
                    <Text style={{ fontFamily: fontFamily.proximaMedium, fontSize: textScale(14), textAlign: "justify" }}>{overview}</Text>
                </Layout>

            </ScrollView>
        )
    }

    const RenderBack = () => {
        return (
            <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={hitSlop}
                style={{ backgroundColor: COLORS.white, borderRadius: 100, width: moderateScale(40), height: moderateScale(40), margin: moderateScale(16) }}>
                <Icon
                    pack={'feather'}
                    name={'arrow-left'}
                    style={{ height: 24, width: 24, tintColor: COLORS.black, alignSelf: "center", marginTop: moderateScale(8) }}
                />
            </TouchableOpacity>
        )
    }

    return (
        <ThemeProvider
            children={
                <WrapperContainer
                    isLoading={loading || isLoading}
                    children={
                        <Layout style={{ flexGrow: 1 }}>
                            <Layout style={{ flex: 0.3 }}>
                                <ImageBackground
                                    source={{ uri: `${API_IMAGE}` + `${backdrop_path}` }}
                                    style={{ width: "100%", height: "100%" }}
                                    onLoad={() => setLoading(true)}
                                    onLoadEnd={() => setLoading(false)}
                                >
                                    <RenderBack />
                                </ImageBackground>

                            </Layout>
                            <Layout style={{ flex: 0.7, borderTopLeftRadius: moderateScale(24), borderTopRightRadius: moderateScale(24), padding: moderateScale(16) }}>
                                <RenderLayout />
                            </Layout>
                        </Layout>
                    }
                />
            }
        />
    )
}

export default DetailScreen;