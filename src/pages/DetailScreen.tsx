import React from 'react';
import {
  View,
  Text,
  Image,
  BackHandler,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../constants/theme';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import WebView from 'react-native-webview';

const DetailScreen = ({route}) => {
  let itemData = route.params;
  console.log('ddd: ', route.params);
  const navigation = useNavigation();

  // Back Button Starts
  const backButtonHandler = () => {
    navigation.goBack();
    return true;
  };

  useFocusEffect(
    React.useCallback(() => {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backButtonHandler,
      );
      return () => backHandler.remove();
    }, []),
  );
  // Back Button Ends

  const formatDate = timestamp => {
    // Convert timestamp to Date object
    const date = new Date(timestamp);

    // Format date as desired (example: "YYYY-MM-DD HH:mm:ss")
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date
      .getHours()
      .toString()
      .padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date
      .getSeconds()
      .toString()
      .padStart(2, '0')}`;

    return formattedDate;
  };

  const injectScript = `
  const header = document.querySelector('.site-header');
  if (header) header.style.display = 'none';
  
  const footer = document.querySelector('.site-footer');
  if (footer) footer.style.display = 'none';
`;

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{height: '25%', width: '100%'}}>
        <TouchableOpacity
          onPress={backButtonHandler}
          style={{
            position: 'absolute',
            top: 15,
            left: 10,
            zIndex: 99,
            backgroundColor: theme.COLORS.WHITE,
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon name="chevron-left" size={30} color={theme.COLORS.PRIMARY} />
        </TouchableOpacity>
        <Image
          source={{
            uri: itemData.data.image_url,
          }}
          style={{width: '100%', height: '100%'}}
          resizeMode="cover"
        />
      </View>
      <View
        style={{
          height: '78%',
          backgroundColor: '#fff',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          top: -25,
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: '#EEEEEE',
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 3,
            paddingHorizontal: 10,
            borderRadius: 10,
            alignSelf: 'flex-start',
            marginTop: 15,
            marginBottom: 5,
            marginHorizontal: 15,
          }}>
          <Text style={{color: 'grey', fontSize: 10}}>
            {itemData.data.categories[0]}
          </Text>
        </View>
        <View style={{width: '100%'}}>
          <View style={{height: '100%', paddingBottom: 10}}>
            <Text
              style={{
                color: theme.COLORS.BLACK,
                fontWeight: 'bold',
                fontSize: 18,
                marginTop: 15,
                width: '100%',
                paddingHorizontal: 15,
              }}>
              {itemData.data.title}
            </Text>
            <View
              style={{
                width: '100%',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                marginTop: 5,
                paddingHorizontal: 15,
              }}>
              <Text style={{fontSize: 12, color: '#000'}}>
                @Crazy Technology
              </Text>
              <Text style={{fontSize: 9, color: 'grey'}}>
                {formatDate(itemData.data.published_at)}
              </Text>
            </View>
            <View style={{flex: 1, marginTop: 10}}>
              <WebView
                source={{
                  uri: itemData.data.url,
                }}
                style={{width: '100%', height: 400}}
                injectedJavaScript={injectScript}
                javaScriptEnabled={true}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DetailScreen;
