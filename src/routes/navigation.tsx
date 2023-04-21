import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { COLORS as colors, fontFamily } from "../constants";
import navigationStrings from "../utils/navigationString";
import * as Screens from "../screens";

const Stack = createNativeStackNavigator();

const options: any = {
    headerTintColor: "#ffffff",
    headerStyle: {
        backgroundColor: colors.white,
        shadowColor: colors.white,
    },
    headerTitleStyle: {
        fontFamily: fontFamily.proximaMedium,
        textTransform: "capitalize",
    },
};


export default function MainStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={navigationStrings.MAINSCREEN}>
            <Stack.Screen
                name={navigationStrings.MAINSCREEN}
                component={Screens.MainScreen}
                options={{
                    headerShown: false,
                    ...options,
                }}
            />
            <Stack.Screen
                name={navigationStrings.DETAILSCREEN}
                component={Screens.DetailScreen}
                options={{
                    headerShown: false,
                    ...options,
                }}
            />
        </Stack.Navigator>
    );
}
