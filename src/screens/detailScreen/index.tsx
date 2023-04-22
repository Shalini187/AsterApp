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

    useFocusEffect(
        useCallback(() => {
            init();
        }, [])
    );

    const init = async () => {
        dispatch(requestAPI({ apiCall: getRequest, url: GET_MOVIE_BY_ID(id), id }));
        return;
    }

    const { poster_path, original_title, overview, release_date, backdrop_path, tagline, genres, spoken_languages, production_companies, vote_average } = dataById || {};

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
                        <Layout style={{ flexDirection: "row", flexWrap: "wrap", flex: 1 }}>
                            <Text style={{ fontFamily: fontFamily.proximaBold, fontSize: textScale(24), flexWrap: "wrap" }}>
                                {`${original_title?.trim()} ${moment(release_date)?.format("(YYYY)")}`}
                            </Text>
                        </Layout>
                        <Layout style={{ marginVertical: moderateScale(16) }}>
                            <Text style={{ fontFamily: fontFamily.proximaBold, fontSize: textScale(12) }}>{tagline}</Text>
                        </Layout>
                        <Layout style={{ marginBottom: moderateScale(16) }}>
                            <Text style={{ fontFamily: fontFamily.proximaBold, fontSize: textScale(14), marginBottom: moderateScale(12) }}>{"Genres"}</Text>
                            <FlatList
                                data={genres}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ paddingRight: moderateScale(100) }}
                                keyExtractor={(_, index) => index.toString()}
                                renderItem={({ item, index }) => (
                                    <Layout level={'4'} key={index} style={{ padding: moderateScale(16), borderRadius: moderateScale(16), margin: moderateScale(4) }}>
                                        <Text style={{ fontFamily: fontFamily.proximaBold, fontSize: textScale(12) }}>{item?.name}</Text>
                                    </Layout>
                                )}
                            />
                        </Layout>
                    </Layout>

                </Layout>
                <Layout style={{ marginVertical: moderateScale(16) }}>
                    <Text style={{ fontFamily: fontFamily.proximaMedium, fontSize: textScale(14), textAlign: "justify" }}>{overview?.trim()}</Text>
                </Layout>
                <Layout style={{ marginVertical: moderateScale(8) }}>
                    <Text style={{ fontFamily: fontFamily.proximaBold, fontSize: textScale(14), textAlign: "justify" }}>
                        {`Release Date : `}
                        <Text style={{ fontFamily: fontFamily.proximaMedium, fontSize: textScale(16), textAlign: "justify" }}>
                            {`${release_date}`}
                        </Text>
                    </Text>
                </Layout>
                <Layout style={{ marginVertical: moderateScale(8) }}>
                    <Text style={{ fontFamily: fontFamily.proximaBold, fontSize: textScale(14), textAlign: "justify" }}>
                        {`Language : `}
                        <Text style={{ fontFamily: fontFamily.proximaMedium, fontSize: textScale(16), textAlign: "justify" }}>
                            {`${[...spoken_languages?.map((i: any) => i?.name)]?.join(" , ")}`}
                        </Text>
                    </Text>
                </Layout>
                <Layout style={{ marginVertical: moderateScale(8) }}>
                    <Text style={{ fontFamily: fontFamily.proximaBold, fontSize: textScale(14), textAlign: "justify" }}>
                        {`User Vote % : `}
                        <Text style={{ fontFamily: fontFamily.proximaMedium, fontSize: textScale(16), textAlign: "justify" }}>
                            {`${vote_average}`}
                        </Text>
                    </Text>
                </Layout>
                <Layout style={{ marginVertical: moderateScale(8) }}>
                    <Text style={{ fontFamily: fontFamily.proximaBold, fontSize: textScale(14), textAlign: "left" }}>
                        {`Production Company : `}
                        <Text style={{ fontFamily: fontFamily.proximaMedium, fontSize: textScale(16), textAlign: "left" }}>
                            {`${[...production_companies?.map((i: any) => i?.name)]?.join(", ")}`}
                        </Text>
                    </Text>
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
                                {(loading || isLoading) ? <></> : <RenderLayout />}
                            </Layout>
                        </Layout>
                    }
                />
            }
        />
    )
}

export default DetailScreen;