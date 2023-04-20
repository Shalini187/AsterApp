import { Text } from '@ui-kitten/components';
import React from 'react';
import {Image, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const ShimmerEffect = () => {
  return (
    <SkeletonPlaceholder borderRadius={4}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{marginLeft: 20}}>
          <Image style={{width: 110, height: 200, resizeMode: "cover", borderRadius: 16}} src={require('../../assets/images/image.webp')} />
          <View style={{width: 60, height: 60}} />
        </View>
      </View>
    </SkeletonPlaceholder>
  );
};

export default ShimmerEffect;