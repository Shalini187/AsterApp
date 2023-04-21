import { Icon, Layout } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { Keyboard, TouchableOpacity } from "react-native";
import { HeaderBar, ThemeProvider, WrapperContainer } from "../../components";
import { hitSlop, moderateScale } from "../../constants";
import { useSelector } from "react-redux";


const DetailScreen = ({ navigation, route }: any) => {
    const { userData, theme } = useSelector((state: any) => state.auth);

    let colorStyle = (theme == "dark") ? "#F2F8FF" : "#002885";
    let fontColor = (theme == "dark") ? "#002885" : "#F2F8FF";

    const [messages, setMessages] = useState([]);
    const [backData, setBackup] = useState<any>([]);
    const [show, setShow] = useState<boolean>(false);
    const [search, setSearch] = useState<string>("");
    const [isKeyboardOpen, setIsKeyboardOpen] = useState<boolean>(false);

    const { uid, name, status } = route?.params || {};



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

    return (
        <ThemeProvider
            children={
                <WrapperContainer
                    children={
                        <>
                            <Layout style={{ flexGrow: 1, margin: moderateScale(8) }}>
                                <HeaderBar isBack={false} headerText={show ? false : name} extraProps={{ status }} onTitleCallback={() => navigation.goBack()}
                                    rightProps={() => (
                                        <Layout style={{ flexDirection: "row" }}>
                                            <TouchableOpacity hitSlop={hitSlop} onPress={() => setShow((c) => !c)}>
                                                <Icon
                                                    pack={'feather'}
                                                    name={show ? "x-circle" : 'search'}
                                                    style={{ height: 22, width: 22, tintColor: colorStyle }}
                                                />
                                            </TouchableOpacity>
                                        </Layout>
                                    )}
                                />

                                <Layout style={{ flex: isKeyboardOpen ? 2 : 6 }}>
                                   
                                     
                                </Layout>
                            </Layout>
                        </>
                    }
                />
            }
        />
    )
}

export default DetailScreen ;