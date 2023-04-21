import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView, TouchableOpacity } from "react-native";
import { Icon, Input, Layout, Text } from '@ui-kitten/components';

import { searchStyle } from '../../styles';
import { hitSlop, moderateScale, COLORS as colors, fontFamily, textScale, height } from "../../constants";
import BottomUpRawSheet from "../bottomSheet";
import { advancedSearch } from "../../utils";
import { requestAPI } from "../../redux/actions/api";

interface ISearch {
    sheetRef: any;
    onApply: Function;
}

function SystemSearch(props: ISearch) {
    let { sheetRef, onApply } = props || {};
    const { theme } = useSelector((state: any) => state?.auth);
    const [value, setValue] = useState<any>("");

    let colorStyle = (theme == "dark") ? "#F2F8FF" : "#002885";

    let { input } = searchStyle || {};

    const dispatch = useDispatch();

    const init = async () => {
        dispatch(requestAPI({ query: value, apiCall: getQueryRequest }));
    }

    const RenderChips = (props: any) => {
        let { sortArray } = props || {};
        return (
            <ScrollView horizontal style={{ flex: 1, marginTop: moderateScale(8) }} showsHorizontalScrollIndicator={false}>
                {
                    sortArray?.map((i: any, k: number) => {
                        return (
                            <Layout key={i} level={"4"} style={{ padding: moderateScale(16), flexDirection: "row", margin: moderateScale(4), borderRadius: moderateScale(24) }}>
                                <Text style={{ fontFamily: fontFamily.proximaMedium, fontSize: textScale(12) }}>{i?.name}</Text>
                            </Layout>

                        )
                    })
                }
            </ScrollView>
        )
    }

    const RenderApply = () => {
        return (
            <Layout style={{ flex: 1, marginTop: moderateScale(32), alignSelf: "flex-end", backgroundColor: colors.red, padding: moderateScale(12), borderRadius: moderateScale(16) }}>
                <TouchableOpacity hitSlop={hitSlop} onPress={() => sheetRef?.current?.close()}>
                    <Text style={{ fontFamily: fontFamily.proximaBold, fontSize: textScale(16) }}>{'Apply'}</Text>
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
                                    <Layout style={{ margin: moderateScale(8), marginBottom: moderateScale(16) }}>
                                        <Text style={{ fontFamily: fontFamily.proximaBold, fontSize: textScale(20), textTransform: "uppercase" }}>{title}</Text>
                                        <Text style={{ fontFamily: fontFamily.proximaMedium, fontSize: textScale(12), textTransform: "capitalize" }}>{subTitle}</Text>
                                        <RenderChips sortArray={sortArray} />
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