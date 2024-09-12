import React from 'react';
import {View} from 'react-native';
import LottieView from 'lottie-react-native';

export default function Loading(props) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}>
      <LottieView
        source={require('../assets/lottie/loading.json')}
        style={{width: props.width, height: props.height}}
        autoPlay
        loop
        resizeMode="contain"
      />
    </View>
  );
}
