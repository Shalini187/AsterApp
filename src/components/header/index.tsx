import React from 'react';
import { Icon, Layout, Text } from '@ui-kitten/components';
import { TouchableOpacity, View } from 'react-native';
import { useSelector } from "react-redux";
import { fontFamily, hitSlop, moderateScale, textScale } from '../../constants';
import { titleWords } from '../../utils';

interface IHeader {
    headerText?: string;
    isBack?: boolean;
    onTap?: Function | any;
    onTitleCallback?: Function | any;
    rightProps?: Function | any;
    extraProps?: any;
}

const HeaderBar = (props: IHeader) => {
    const { theme } = useSelector((state: any) => state.auth);

    const { headerText, isBack, onTap, rightProps, onTitleCallback } = props || {};

    let colorStyle = (theme == "dark") ? "#F2F8FF" : "#002885";
    let fontColor = (theme == "dark") ? "#002885" : "#F2F8FF";

    const RenderBack = () => {
        if (isBack) {
            return (
                <TouchableOpacity onPress={onTap} hitSlop={hitSlop}>
                    <Icon
                        pack={'feather'}
                        name={'arrow-left'}
                        style={{ height: 24, width: 24, tintColor: colorStyle }}
                    />
                </TouchableOpacity>
            )
        } else return <></>;
    }

    const RenderTextHeader = () => {
        if (headerText) {
            return (
                <TouchableOpacity onPress={onTitleCallback} style={{ flexDirection: 'row' }}>
                    <Layout style={{ height: 50, width: 50, backgroundColor: colorStyle, borderRadius: 100, marginRight: 16 }}>
                        <Text style={{ fontFamily: fontFamily.proximaBold, textTransform: "capitalize", alignSelf: "center", padding: moderateScale(14), color: fontColor }}>{titleWords(headerText)}</Text>
                    </Layout>
                    <Layout>
                        <Text style={{ fontSize: textScale(24), fontFamily: fontFamily.helveticaBold, textTransform: "capitalize", marginTop: moderateScale(8) }}>{"Discover"}</Text>
                    </Layout>
                </TouchableOpacity>
            )
        } else return <></>;
    }

    return (
        <Layout style={{ flex: 1 }} >
            <Layout style={{ margin: 16, flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 0 }}>
                <RenderBack />
                <RenderTextHeader />
                {rightProps?.() ?? <View />}
            </Layout>
        </Layout>
    )
}

export default HeaderBar