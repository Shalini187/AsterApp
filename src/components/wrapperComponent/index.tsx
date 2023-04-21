import React from 'react';
import { Layout } from '@ui-kitten/components';
import Loader from '../loader';

interface IWrap {
    children: any;
    isLoading?: boolean;
}

const WrapperContainer = (props: IWrap) => {
    let { children, isLoading = false } = props || {};

    return (
        <Layout style={{ flex: 1 }}>
            <Layout style={{ flex: 1 }}>{children}</Layout>
            <Loader isLoading={isLoading} />
        </Layout>
    );
};

export default WrapperContainer;
