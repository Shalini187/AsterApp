import { Icon, Layout, Text } from "@ui-kitten/components";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, Keyboard, RefreshControl, TouchableOpacity } from "react-native";
import { HeaderBar, SystemSearch, ThemeProvider, WrapperContainer } from "../../components";
import { COLORS, fontFamily, hitSlop, moderateScale, textScale } from "../../constants";
import { formatData, getLoginUsers, searchOptions, signOut } from "../../utils";
import { chatStyles } from '../../styles';
import { useSelector } from "react-redux";
import navigationString from "../../utils/navigationString";
import { onChangeTheme } from "../../redux/actions/auth";
import { useFocusEffect } from "@react-navigation/native";
import Fuse from "fuse.js";
import { getRequest } from "../../services/api";
import { API_IMAGE, GET_POPULAR_LIST } from "../../services/urls";
import FastImage from "react-native-fast-image";

let _ = require("lodash");

let { text, mycard } = chatStyles || {};

const MainScreen = ({ navigation, route }: any) => {
    const { userData, theme, token } = useSelector((state: any) => state.auth);
    let fontColor = (theme != "dark") ? "#002885" : "#F2F8FF";

    const [search, setSearch] = useState<string>("");
    const [show, setShow] = useState<boolean>(false);
    const [users, setUsers] = useState<any>(null);
    const [groups, setGroups] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [refresh, setRefresh] = useState<boolean>(false);
    const [loginUser, setLoginUser] = useState<any>('');
    const [isKeyboardOpen, setIsKeyboardOpen] = useState<boolean>(false);

    const [movieState, setMovieData] = useState<any>({
        page: 1, movieData: [], backData: []
    });

    const { page, movieData, backData } = movieState || {};

    console.log("moiew", movieData, token)

    useFocusEffect(
        useCallback(() => {
            init();
        }, [])
    );

    useEffect(() => {
        getLoginUsers(setLoginUser, userData);
    }, [refresh]);

    useEffect(() => {
        const showKey = Keyboard.addListener("keyboardDidShow", (val) => {
            setIsKeyboardOpen(true);
        });
        const hideKey = Keyboard.addListener("keyboardDidHide", (val) => {
            setIsKeyboardOpen(false);
        });

        return () => {
            showKey.remove();
            hideKey.remove();
        };
    }, []);

    const onUpdate = (data: any) => {
        setMovieData((state: any) => ({ ...state, ...data }));
    };

    const init = async () => {
        try {
            let response: any = await getRequest(GET_POPULAR_LIST);
            if (response?.results?.length) {
                onUpdate({ movieData: response?.results, page: response?.page, backData: response?.results });
            }
        } catch (e) {
            console.log(e);
        }
        setRefresh(false);
    }

    const onChange = (searchText: string) => {
        setSearch(searchText);
        const fuseCategory = new Fuse(movieData, searchOptions);
        let temp = fuseCategory?.search(searchText), dummyArray: any = [];
        
        temp?.forEach((item) => { dummyArray?.push(item?.item) });

        onUpdate({ movieData: dummyArray });

        if (!searchText && !dummyArray.length) {
            onUpdate({ movieData: backData });
        }
    };

    const RenderCard = ({ item, index }: any) => {
        let { name, uid, status, title, poster_path } = item || {};
        if (!title) return <Layout style={{ ...mycard, backgroundColor: 'transparent' }} />;
        return (
            <TouchableOpacity key={index} onPress={() => {
                navigation.navigate(navigationString.DETAILSCREEN, {
                    name: title, uid,
                    status: typeof (status) == "string" ? status : status?.toDate().toString() ?? ""
                });
            }}>
                <FastImage
                    style={{
                        height: moderateScale(200),
                        width: moderateScale(110),
                        borderRadius: moderateScale(16),
                        overflow: "hidden", zIndex: 1,
                        resizeMode: "contain",
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
        <ThemeProvider
            children={
                <WrapperContainer
                    children={
                        <>
                            <Layout style={{ flex: 1 }}>
                                <HeaderBar isSearch={() => {
                                    if (show) {
                                        return (
                                            <SystemSearch
                                                value={search}
                                                setValue={onChange}
                                            />
                                        )
                                    } else return;
                                }} headerText={show ? false : loginUser?.[0]?.name} extraProps={{ status: loginUser?.[0]?.status }} rightProps={() => (
                                    <>
                                        <Layout style={{ flexDirection: "row", marginTop: moderateScale(12) }}>
                                            {!show ?
                                                <>
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
                                                </>
                                                : <></>}
                                            <TouchableOpacity onPress={() => setShow(c => !c)}>
                                                <Icon
                                                    pack={'feather'}
                                                    name={show ? 'x-circle' : "search"}
                                                    style={{ height: 22, width: 22, tintColor: fontColor, marginLeft: moderateScale(16) }}
                                                />
                                            </TouchableOpacity>
                                        </Layout>
                                    </>
                                )} />
                            </Layout>
                            <Layout style={{ flex: isKeyboardOpen ? 2 : show ? 4 : 7 }}>
                                <FlatList
                                    data={formatData(movieData, 3)}
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={refresh}
                                            onRefresh={() => {
                                                setTimeout(() => setRefresh((r) => !r), 1000);
                                            }}
                                        />
                                    }
                                    listKey={'A'}
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
                                    keyExtractor={(item) => item?.title}
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
                                        name={"users"}
                                        style={{ height: 22, width: 22, tintColor: fontColor, marginHorizontal: moderateScale(4), alignSelf: "center" }}
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