import React, { useCallback, useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Icon, Layout,  } from "@ui-kitten/components";
import { HeaderBar, MovieList, ThemeProvider, WrapperContainer } from "../../components";
import { COLORS, hitSlop, moderateScale } from "../../constants";
import { getLoginUsers, signOut } from "../../utils";
import { chatStyles } from '../../styles';
import { useSelector } from "react-redux";
import navigationString from "../../utils/navigationString";
import { onChangeTheme } from "../../redux/actions/auth";
import { useFocusEffect } from "@react-navigation/native";
import { getRequest } from "../../services/api";
import { GET_POPULAR_LIST } from "../../services/urls";

let _ = require("lodash");

const MainScreen = ({ navigation, route }: any) => {
    const { userData, theme, token } = useSelector((state: any) => state.auth);
    let fontColor = (theme != "dark") ? "#002885" : "#F2F8FF";

    const [loading, setLoading] = useState<boolean>(true);
    const [refresh, setRefresh] = useState<boolean>(false);
    const [loginUser, setLoginUser] = useState<any>('');

    const [movieState, setMovieData] = useState<any>({  page: 1, movieData: [] });

    const { page, movieData } = movieState || {};

    console.log("moiew", movieData, token)

    useFocusEffect(
        useCallback(() => {
            init();
        }, [token?.length])
    );

    useEffect(() => {
        init();
    }, [refresh]);

    useEffect(() => {
        getLoginUsers(setLoginUser, userData);
    }, []);

    const onUpdate = (data: any) => {
        setMovieData((state: any) => ({ ...state, ...data }));
    };

    const init = async () => {
        try {
            let response: any = await getRequest(GET_POPULAR_LIST);
            if (response?.results?.length) {
                onUpdate({ movieData: response?.results, page: response?.page, backData: response?.results });
                setLoading(false);
            }

        } catch (e) {
            console.log(e);
            setLoading(false);
        }
        setRefresh(false);
    }

    const RenderRightComp = () => {
        return (
            <Layout style={{ flexDirection: "row", marginTop: moderateScale(12) }}>
                <TouchableOpacity hitSlop={hitSlop} onPress={() => signOut(userData, setLoading)}>
                    <Icon
                        pack={'feather'}
                        name={'log-out'}
                        style={{ height: 22, width: 22, tintColor: COLORS.red }}
                    />
                </TouchableOpacity>
                <TouchableOpacity hitSlop={hitSlop} onPress={() => onChangeTheme(theme == "dark" ? "light" : "dark")}>
                    <Icon
                        pack={'feather'}
                        name={theme == "dark" ? 'sun' : "moon"}
                        style={{ height: 22, width: 22, tintColor: fontColor, marginLeft: moderateScale(16) }}
                    />
                </TouchableOpacity>
            </Layout>
        )
    }

    return (
        <ThemeProvider
            children={
                <WrapperContainer
                    isLoading = {loading}
                    children={
                        <>
                            <Layout style={{ flex: 1 }}>
                                <HeaderBar headerText={loginUser?.[0]?.name} extraProps={{ status: loginUser?.[0]?.status }} rightProps={() => <RenderRightComp />} />
                            </Layout>
                            <Layout style={{ flex: 8 }}>
                                <MovieList
                                    data={movieData}
                                    setRefresh={setRefresh}
                                    refresh={refresh}
                                    navigation={navigation}
                                    numColumns={3}
                                />
                            </Layout>
                            <Layout level={'4'} style={{ borderRadius: moderateScale(100), alignSelf: "flex-end", margin: moderateScale(16) }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate(navigationString.DETAILSCREEN);
                                    }}
                                    style={{ padding: moderateScale(8), alignSelf: "center", width: moderateScale(50), height: moderateScale(50) }}>
                                    <Icon
                                        pack={'feather'}
                                        name={"search"}
                                        style={{ height: 22, width: 22, tintColor: fontColor, marginVertical: moderateScale(4), alignSelf: "center" }}
                                    />
                                </TouchableOpacity>
                            </Layout>
                        </>
                    }
                />
            }
        />
    )
}

export default MainScreen;