import React from "react";
import { useSelector } from "react-redux";
import { KeyboardAvoidingView, TouchableOpacity } from "react-native";
import { Icon, Input } from '@ui-kitten/components';

import { searchStyle } from '../../styles';
import { hitSlop } from "../../constants";

interface ISearch {
    value: string;
    setValue: Function;
}

function SystemSearch(props: ISearch) {
    const { theme } = useSelector((state: any) => state?.auth);
    let { value, setValue } = props || {};
   
    let colorStyle = (theme == "dark") ? "#F2F8FF" : "#002885";

    let { centeredView, input } = searchStyle || {};

    return (
        <KeyboardAvoidingView behavior={'padding'}
            enabled style={{ ...centeredView }}>
            <Input
                value={value}
                style={{ ...input }}
                textStyle={{ ...input }}
                keyboardType={'web-search'}
                returnKeyLabel={'Go'}
                placeholder={'Search here...'}
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
            />
        </KeyboardAvoidingView>
    );
};

export default SystemSearch;