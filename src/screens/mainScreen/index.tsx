import React, { useCallback, useEffect, useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Icon, Layout, } from "@ui-kitten/components";
import { HeaderBar, MovieList, SystemSearch, ThemeProvider, WrapperContainer } from "../../components";
import { COLORS, hitSlop, moderateScale } from "../../constants";
import { getLoginUsers, signOut } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { onChangeTheme } from "../../redux/actions/auth";
import { useFocusEffect } from "@react-navigation/native";
import { requestAPI } from '../../redux/actions/api';
import { getQueryRequest } from "../../services/api";
import { GET_SEARCH_LIST } from "../../services/urls";
import types from "../../redux/types";

let _ = require("lodash");

const MainScreen = ({ navigation, route }: any) => {
    const { userData, theme, token } = useSelector((state: any) => state.auth);
    const { data: movieData, isListEnd, moreLoading, loading } = useSelector((state: any) => state.api);

    const dispatch: any = useDispatch();

    let fontColor = (theme != "dark") ? "#002885" : "#F2F8FF";

    const [loginUser, setLoginUser] = useState<any>('');
    const [value, setValue] = useState<any>('');
    const [page, setPage] = useState<number>(1);

    const [sortBy, setSortByItems] = useState<string>("");
    const [genreItems, setGenreItems] = useState<any>([]);

    const sheetRef: any = useRef(null);

    useFocusEffect(
        useCallback(() => {
            init(false);
        }, [page, token?.[0]?.TOKEN])
    );

    useEffect(() => {
        init(false);
        getLoginUsers(setLoginUser, userData);
    }, []);

    const init = async (reset: boolean) => {
        if (!!value && !reset) {
            dispatch(requestAPI({ query: value, apiCall: getQueryRequest, url: GET_SEARCH_LIST, page }));
            return;
        }
        setValue("");
        dispatch(requestAPI({ page, apiCall: getQueryRequest }));
    }

    const fetchMoreData = () => {
        // if (!isListEnd && !moreLoading) {
        //     setPage((p) => p + 1);
        // }
        if (loading) return;
        setPage((p) => p + 1);
    }

    const onReset = () => {
        setPage(1);
        setValue("");
        setGenreItems([]);
        setSortByItems("");
        dispatch({
            type: types.CLEAR_REDUX_DATA,
        });
        init(true);
    }

    const RenderRightComp = () => {
        return (
            <Layout style={{ flexDirection: "row", marginTop: moderateScale(12) }}>
                <TouchableOpacity hitSlop={hitSlop} onPress={() => signOut(userData,)}>
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
                <TouchableOpacity hitSlop={hitSlop} onPress={onReset}>
                    <Icon
                        pack={'feather'}
                        name={"refresh-cw"}
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
                    isLoading={loading}
                    children={
                        <>
                            <Layout style={{ flex: 1 }}>
                                <HeaderBar headerText={loginUser?.[0]?.name} extraProps={{ status: loginUser?.[0]?.status }} rightProps={() => <RenderRightComp />} />
                            </Layout>
                            <Layout style={{ flex: 8 }}>
                                <MovieList
                                    numColumns={3}
                                    data={movieData}
                                    navigation={navigation}
                                    endReach={fetchMoreData}
                                    onClick={() => dispatch({
                                        type: types.CLEAR_REDUX_DATAID,
                                    })}
                                />
                                <Layout level={'4'} style={{ borderRadius: moderateScale(100), alignSelf: "flex-end", margin: moderateScale(16) }}>
                                    <TouchableOpacity
                                        onPress={() => sheetRef?.current?.open()}
                                        style={{ padding: moderateScale(8), alignSelf: "center", width: moderateScale(50), height: moderateScale(50) }}>
                                        <Icon
                                            pack={'feather'}
                                            name={"search"}
                                            style={{ height: 22, width: 22, tintColor: fontColor, marginVertical: moderateScale(4), alignSelf: "center" }}
                                        />
                                    </TouchableOpacity>
                                </Layout>
                            </Layout>
                            <SystemSearch
                                value={value}
                                sheetRef={sheetRef}
                                setValue={setValue}
                                setPage={setPage}
                                page={page}
                                extraData = {{
                                    sortBy, setSortByItems,
                                    genreItems, setGenreItems
                                }}
                            />
                        </>
                    }
                />
            }
        />
    )
}

export default MainScreen;