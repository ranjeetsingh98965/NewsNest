import React from 'react';
import {View, Image, Linking, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Swiper from 'react-native-swiper';
import {useNavigation} from '@react-navigation/core';
import theme from '../constants/theme';

// const item = [
//   {
//     uri: 'https://www.ixambee.com/v5/assets/images/banners/mobile_app_new_banner.png',
//     id: 1,
//   },
//   {
//     uri: 'https://www.ixambee.com/v5/assets/images/banners/beepediamobilebanner.jpg',
//     id: 2,
//   },
//   {
//     uri: 'https://www.ixambee.com/v5/assets/images/banners/general-awrenessmobilebanner.jpg',
//     id: 3,
//   },
// ];

const Banner = data => {
  let list = data.data;
  const navigation = useNavigation();

  return (
    <Swiper
      loop={true}
      autoplay={true}
      style={styles.wrapper}
      paginationStyle={{bottom: -2}}
      showsButtons={false}
      dot={
        <View
          style={{
            backgroundColor: theme.COLORS.SECONDARY,
            width: 8,
            height: 8,
            borderRadius: 4,
            marginHorizontal: 5,
          }}
        />
      }
      activeDot={
        <View
          style={{
            backgroundColor: theme.COLORS.PRIMARY,
            width: 8,
            height: 8,
            borderRadius: 4,
            marginHorizontal: 5,
          }}
        />
      }
      onIndexChanged={id => ''}>
      {list.map(item => {
        return (
          <TouchableOpacity
            style={styles.slide1}
            onPress={() =>
              navigation.navigate('detailScreen', {
                data: item,
              })
            }>
            <Image
              style={{width: '100%', height: '100%'}}
              source={{uri: item.image_url}}
              resizeMode="stretch"
            />
            <View
              style={{
                position: 'absolute',
                zIndex: 99,
                justifyContent: 'flex-end',
                height: '100%',
                width: '100%',
                paddingVertical: 10,
                paddingHorizontal: 8,
              }}>
              <View
                style={{
                  backgroundColor: 'rgba(0,0,0,.5)',
                  padding: 5,
                  borderRadius: 10,
                }}>
                <Text style={{color: '#fff'}}>{item.title}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    borderRadius: 10,
    marginHorizontal: 10,
    height: 180,
    overflow: 'hidden',
    elevation: 3,
    marginBottom: 5,
  },
});

export default Banner;
