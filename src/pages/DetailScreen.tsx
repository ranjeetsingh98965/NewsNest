import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  BackHandler,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../constants/theme';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import WebView from 'react-native-webview';
import Loading from '../components/Loading';

const DetailScreen = ({route}) => {
  let itemData = route.params;
  console.log('ddd: ', route.params);
  const navigation = useNavigation();
  const [loadingTime, setLoadingTime] = useState(true);

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

  const injectScript = `
         function hideElements() {
      // Hide header, footer, ads, and common sections like suggestions and latest news
      const header = document.querySelector('header');
      const footer = document.querySelector('footer');
      const ads = document.querySelectorAll('.ad, .adsbygoogle, [id*="ad"]');
      const suggestions = document.querySelectorAll('.suggestions, .related-news, .latest-news, .trending-news, .recommended-news');

      // Hide header and footer
      if (header) header.style.display = 'none';
      if (footer) footer.style.display = 'none';

      // Hide ads
      if (ads.length > 0) {
        ads.forEach(ad => ad.style.display = 'none');
      }

      // Hide suggestions, related, and latest news
      if (suggestions.length > 0) {
        suggestions.forEach(suggestion => suggestion.style.display = 'none');
      }
    }

    // Continuously hide elements every 1 second to catch dynamically loaded content
    setInterval(hideElements, 1000);

    // Initial call to hide elements
    hideElements();
  `;

  //   const injectScript = `
  //   function hideElements() {
  //     // Hide header, footer, ads, bottom navigation, pop-ups, and unwanted sections
  //     const header = document.querySelector('header');
  //     const footer = document.querySelector('footer');
  //     const ads = document.querySelectorAll('.ad, .adsbygoogle, [id*="ad"], .video-ad, .video-button');
  //     const suggestions = document.querySelectorAll('.suggestions, .related-news, .latest-news, .trending-news, .recommended-news');
  //     const popups = document.querySelectorAll('.popup, .modal, .et-app-advertisement, .app-prompt, .open-in-app');
  //     const bottomNav = document.querySelectorAll('.bottom-nav, .nav-bar, .bottom-navigation, [id*="bottom-nav"], [class*="bottom-nav"], .bottom-tab');
  //     const socialIcons = document.querySelectorAll('.social-icons, .share-buttons, .social-share, [class*="social"], [id*="social"]');
  //     const followUs = document.querySelectorAll('.follow-us, [class*="follow-us"]');

  //     // Hide header and footer
  //     if (header) header.style.display = 'none';
  //     if (footer) footer.style.display = 'none';

  //     // Hide ads and video buttons
  //     if (ads.length > 0) {
  //       ads.forEach(ad => ad.style.display = 'none');
  //     }

  //     // Hide suggestions, related, and latest news
  //     if (suggestions.length > 0) {
  //       suggestions.forEach(suggestion => suggestion.style.display = 'none');
  //     }

  //     // Hide pop-ups and modals
  //     if (popups.length > 0) {
  //       popups.forEach(popup => popup.style.display = 'none');
  //     }

  //     // Hide bottom navigation bar
  //     if (bottomNav.length > 0) {
  //       bottomNav.forEach(nav => nav.style.display = 'none');
  //     }

  //     // Hide social media icons and share buttons
  //     if (socialIcons.length > 0) {
  //       socialIcons.forEach(icon => icon.style.display = 'none');
  //     }

  //     // Hide "Follow Us" section
  //     if (followUs.length > 0) {
  //       followUs.forEach(follow => follow.style.display = 'none');
  //     }
  //   }

  //   // Continuously hide elements every 1 second to catch dynamically loaded content
  //   setInterval(hideElements, 1000);

  //   // Initial call to hide elements
  //   hideElements();
  // `;

  useEffect(() => {
    setTimeout(() => {
      setLoadingTime(false);
    }, 1000);
  }, []);

  return (
    <>
      <StatusBar
        animated={true}
        barStyle={'dark-content'}
        backgroundColor={theme.COLORS.WHITE}
        hidden={false}
      />
      <View
        style={{
          height: 60,
          width: '100%',
          backgroundColor: '#fff',
          elevation: 3,
          marginBottom: 2,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={backButtonHandler}
          style={{
            position: 'absolute',
            left: 10,
            zIndex: 99,
            backgroundColor: theme.COLORS.WHITE,
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon name="chevron-left" size={30} color={theme.COLORS.PRIMARY} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: theme.COLORS.PRIMARY,
          }}>
          News
        </Text>
      </View>
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        {loadingTime == false ? (
          <View
            style={{
              backgroundColor: '#fff',
              alignItems: 'center',
            }}>
            <View style={{width: '100%'}}>
              <View style={{height: '100%'}}>
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
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Loading width={100} height={100} />
          </View>
        )}
      </View>
    </>
  );
};

export default DetailScreen;
