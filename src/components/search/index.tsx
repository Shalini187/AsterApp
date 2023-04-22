import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView, TouchableOpacity } from "react-native";
import { Icon, Input, Layout, Text } from '@ui-kitten/components';

import { searchStyle } from '../../styles';
import { hitSlop, moderateScale, COLORS as colors, fontFamily, textScale, height } from "../../constants";
import BottomUpRawSheet from "../bottomSheet";
import { advancedSearch } from "../../utils";
import { requestAPI } from "../../redux/actions/api";
import { GET_SEARCH_LIST } from "../../services/urls";
import { getQueryRequest } from "../../services/api";

interface ISearch {
    sheetRef: any;
    value: any;
    setValue: any
    page: number;
    setPage: any;
    extraData?: any
}

function SystemSearch(props: ISearch) {
    let { setPage, sheetRef, value, setValue, page, extraData } = props || {};
    let { sortBy, setSortByItems, genreItems, setGenreItems } = extraData || {};
    const { theme } = useSelector((state: any) => state?.auth);

    let colorStyle = (theme == "dark") ? "#F2F8FF" : "#002885";

    let { input } = searchStyle || {};

    const dispatch: any = useDispatch();

    const applySearch = async () => {
        if (!!value) {
            setPage(1);
            setGenreItems([]);
            setSortByItems("");
            dispatch({ type: "CLEAR_REDUX_DATA" });
            dispatch(requestAPI({ query: value, apiCall: getQueryRequest, url: GET_SEARCH_LIST, page }));
            return;
        }
        if (genreItems?.length || sortBy?.length) {
            setPage(1);
            dispatch({ type: "CLEAR_REDUX_DATA" });
            dispatch(requestAPI({ page, apiCall: getQueryRequest, sort_by: sortBy, with_genres: genreItems?.toString() }));
            return;
        }
        dispatch(requestAPI({ page, apiCall: getQueryRequest }));
    }

    const isChecked = (item: any) => {
        return genreItems?.includes(item);
    }

    const addClickItems = (item: any) => {
        setGenreItems((check: any) => [...check, item]);
    }

    const removeClickItems = (item: any) => {
        let temp = [...genreItems];
        const index = genreItems?.indexOf(item);
        if (index > -1) { // only splice array when item is found
            temp.splice(index, 1); // 2nd parameter means remove one item only
        }
        setGenreItems(temp);
    }

    const onClick = useCallback((i: any) => {
        if (!!isChecked(i)) {
            return removeClickItems(i);
        } else {
            return addClickItems(i);
        }
    }, [genreItems]);

    const RenderChips = (props: any) => {
        let { sortArray, title } = props || {};
        return (
            <ScrollView horizontal style={{ flex: 1, marginTop: moderateScale(8) }} showsHorizontalScrollIndicator={false}>
                {
                    sortArray?.map((i: any, k: number) => {
                        return (
                            <TouchableOpacity onPress={() => {
                                setValue("");
                                title ? setSortByItems(i?.value) : onClick(i?.value);
                            }}>
                                <Layout key={'_' + Math.random().toString(36).substr(2, 9)} level={"4"} style={{ padding: moderateScale(16), flexDirection: "row", margin: moderateScale(4), borderRadius: moderateScale(24), borderColor: colorStyle, backgroundColor: (sortBy == i?.value || isChecked(i?.value)) ? colors.lightLime : colors.transparent, borderWidth: 0.7 }}>
                                    <Text style={{ fontFamily: fontFamily.proximaMedium, fontSize: textScale(12) }}>{i?.name}</Text>
                                </Layout>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        )
    }

    const RenderApply = () => {
        return (
            <Layout style={{ flex: 1, marginTop: moderateScale(32), alignSelf: "flex-end", backgroundColor: colors.red, padding: moderateScale(12), borderRadius: moderateScale(16) }}>
                <TouchableOpacity hitSlop={hitSlop} onPress={() => {
                    applySearch();
                    sheetRef?.current?.close();
                }}>
                    <Text style={{ fontFamily: fontFamily.proximaBold, fontSize: textScale(16), color: colors.white }}>{'Apply'}</Text>
                </TouchableOpacity>
            </Layout>
        )
    }

    return (
        <BottomUpRawSheet
            sheetRef={sheetRef}
            sheetHeight={moderateScale(height / 2)}
            backgroundColor={colors.blackopacity70}
        >
            <Layout style={{ paddingHorizontal: moderateScale(24), paddingVertical: moderateScale(16), flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ fontFamily: fontFamily.proximaBold, fontSize: textScale(24) }}>{'Search'}</Text>
                <TouchableOpacity hitSlop={hitSlop} onPress={() => sheetRef?.current?.close()}>
                    <Icon
                        pack={'feather'}
                        name={"x"}
                        style={{ height: 22, width: 22, tintColor: colors.red, marginTop: moderateScale(4) }}
                    />
                </TouchableOpacity>
            </Layout>
            <Layout>
                <ScrollView
                    style={{ marginHorizontal: moderateScale(32) }}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: moderateScale(100) }}>
                    {
                        advancedSearch?.map((i: any, k: number) => {
                            let { title, sortArray, subTitle } = i || {};
                            if (sortArray?.length) {
                                return (
                                    <Layout key={k} style={{ margin: moderateScale(8), marginBottom: moderateScale(16) }}>
                                        <Text style={{ fontFamily: fontFamily.proximaBold, fontSize: textScale(20), textTransform: "uppercase" }}>{title}</Text>
                                        <Text style={{ fontFamily: fontFamily.proximaMedium, fontSize: textScale(12), textTransform: "capitalize" }}>{subTitle}</Text>
                                        <RenderChips sortArray={sortArray} title={title == "Sort"} />
                                    </Layout>
                                )
                            } else {
                                return (
                                    <>
                                        <Text style={{ fontFamily: fontFamily.proximaExtraBold, fontSize: textScale(20), textTransform: "lowercase", marginBottom: moderateScale(14), alignSelf: "center" }}>{"OR"}</Text>
                                        <Text style={{ fontFamily: fontFamily.proximaBold, fontSize: textScale(20), textTransform: "uppercase", marginBottom: moderateScale(16) }}>{title}</Text>
                                        <Input
                                            value={value}
                                            style={{ ...input }}
                                            textStyle={{ ...input }}
                                            keyboardType={'web-search'}
                                            returnKeyLabel={'Go'}
                                            placeholder={subTitle}
                                            onChangeText={(text: string) => setValue(text)}
                                            accessoryRight={(props: any) => {
                                                return value ?
                                                    <TouchableOpacity hitSlop={hitSlop} onPress={() => setValue("")}>
                                                        <Icon
                                                            {...props}
                                                            pack={'feather'}
                                                            name={"x"}
                                                            style={{ height: 22, width: 22, tintColor: colorStyle }}
                                                        />
                                                    </TouchableOpacity>
                                                    : <></>
                                            }}
                                            accessoryLeft={(props: any) => (
                                                <TouchableOpacity hitSlop={hitSlop} onPress={() => setValue("")}>
                                                    <Icon
                                                        {...props}
                                                        pack={'feather'}
                                                        name={"search"}
                                                        style={{ height: 22, width: 22, tintColor: colorStyle }}
                                                    />
                                                </TouchableOpacity>
                                            )}
                                        />
                                    </>
                                )
                            }
                        })
                    }
                    <RenderApply />
                </ScrollView>
            </Layout>
        </BottomUpRawSheet >
    );
};

export default SystemSearch;