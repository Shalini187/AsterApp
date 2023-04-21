import { Layout, Spinner } from "@ui-kitten/components";
import { Modal, StyleSheet } from "react-native";
import React from "react";

interface Iloader {
    isLoading?: boolean;
}

const Loader = (prop: Iloader) => {
    const { isLoading } = prop || {};

    if (isLoading) {
        return (
            <Layout style={style.container}>
                <Spinner size={'giant'} status={'primary'} />
            </Layout>
        );
    }
    return null;
};

export default Loader;

const style = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.3)",
    }
});
