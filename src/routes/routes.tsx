import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from "react-redux";

import navigationStrings from "../utils/navigationString";
import { navigationRef } from "./navigationService";
import { LoginScreen, SignupScreen } from "../screens";
import MainStack from "../routes/navigation";
import { getRequest } from "../services/api";
import { GET_POPULAR_LIST } from "../services/urls";

const Stack = createNativeStackNavigator();

export default function Routes() {
    const userData = useSelector((state: any) => state.auth.userData);

  const { token } = useSelector((state: any) => state.auth);
  console.log("e", token)

    useEffect(() => {
        getRequest(token?.[0], GET_POPULAR_LIST)?.then((a) => {
            console.log("ww", a)
        })
    }, [token?.TOKEN]);

    return (
        <NavigationContainer
            ref={navigationRef}
        >
            {userData?.uid ? (
                MainStack()
            ) : (
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen
                        name={navigationStrings.LOGIN}
                        component={LoginScreen}
                    />
                    <Stack.Screen
                        name={navigationStrings.SIGNUP}
                        component={SignupScreen}
                    />
                </Stack.Navigator>
            )}
        </NavigationContainer>
    );
}
