import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  BackHandler,
  ScrollView,
  StatusBar,
} from 'react-native';
import theme from '../constants/theme';
import Banner from '../components/Banner';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TRANDING_NEWS_API, CATEGORY_NEWS_API} from '@env';
import axios from 'axios';
import Loading from '../components/Loading';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [selectedCategoryId, setSelectedCategoryId] = useState(1);
  const [greeting, setGreeting] = useState('');
  const [name, setName] = useState('Guest');
  const [gender, setGender] = useState('');
  const [topTrandingNewsData, setTopTrandingNewsData] = useState([]);
  const [topCategoryNewsData, setTopCategoryNewsData] = useState([]);

  const getNameAndGender = async () => {
    const name = await AsyncStorage.getItem('name');
    const gender = await AsyncStorage.getItem('gender');
    // console.log('n: ', name, ' g: ', gender);
    if (name != null && gender != null) {
      setName(name);
      setGender(gender);
    } else if (name != null) {
      setName(name);
    } else if (gender != null) {
      setGender(gender);
    }
  };

  const get_Top_News_Data = () => {
    console.log('lele: ', TRANDING_NEWS_API);
    try {
      axios
        .get(
          `https://api.thenewsapi.com/v1/news/top?api_token=${TRANDING_NEWS_API}&locale=in&limit=3`,
        )
        .then(response => {
          // console.log('Data:', response.data);
          setTopTrandingNewsData(response.data.data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    } catch (error) {
      console.log('err: ', error);
    }
  };

  const get_categpory_News_Data = (category: String) => {
    console.log('lele: ', TRANDING_NEWS_API);
    try {
      axios
        .get(
          `https://api.mediastack.com/v1/news?access_key=${CATEGORY_NEWS_API}=${category}&languages=en&countries=in`,
        )
        .then(response => {
          console.log('Data:', response.data);
          setTopCategoryNewsData(response.data.data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    } catch (error) {
      console.log('err: ', error);
    }
  };

  useEffect(() => {
    getNameAndGender();
    get_Top_News_Data();
    get_categpory_News_Data('general');
  }, []);

  useEffect(() => {
    const now = new Date();
    const hours = now.getHours();

    let greetingMessage = 'Night! Hope you had a wonderful day.';
    if (hours >= 5 && hours < 12) {
      greetingMessage = 'Rise and shine! Good Morning!';
    } else if (hours >= 12 && hours < 17) {
      greetingMessage = 'Good Afternoon! Keep up the great work.';
    } else if (hours >= 17 && hours < 21) {
      greetingMessage = 'Good Evening! Time to relax and unwind.';
    }

    setGreeting(greetingMessage);
  }, []);

  // Back Button Starts
  const backButtonHandler = () => {
    BackHandler.exitApp();
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

  const category = [
    {
      id: 1,
      title: 'general',
    },
    {
      id: 2,
      title: 'business',
    },
    {
      id: 3,
      title: 'entertainment',
    },
    {
      id: 4,
      title: 'health',
    },
    {
      id: 5,
      title: 'science',
    },
    {
      id: 6,
      title: 'sports',
    },
    {
      id: 7,
      title: 'technology',
    },
  ];

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
          flex: 1,
          backgroundColor: theme.COLORS.WHITE,
          paddingTop: 10,
        }}>
        {/* User Details  */}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{paddingHorizontal: 10}}>
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 50,
                borderWidth: 1,
                borderColor: theme.COLORS.PRIMARY,
              }}>
              <Image
                source={
                  gender == 'male'
                    ? require('../assets/images/profileImage/boy.png')
                    : require('../assets/images/profileImage/girl.png')
                }
                style={{width: '100%', height: '100%'}}
                resizeMode="contain"
              />
            </View>
          </View>
          <View>
            <Text
              style={{
                color: theme.COLORS.PRIMARY,
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              {name.toUpperCase()}
            </Text>
            <Text
              style={{
                color: 'grey',
                top: -2,
                fontSize: 12,
              }}>
              {gender.toLowerCase()}
            </Text>
          </View>
        </View>

        {/* Greeting */}
        <View style={{paddingHorizontal: 15, paddingVertical: 10}}>
          <Text
            style={{
              color: theme.COLORS.BLACK,
              fontWeight: 'bold',
              fontSize: 20,
            }}>
            {greeting}
          </Text>
        </View>

        {/* Banner  */}
        {topTrandingNewsData.length > 0 ? (
          <View style={{height: 200, marginTop: 15}}>
            <Banner data={topTrandingNewsData} />
          </View>
        ) : (
          <View style={{height: 200, marginTop: 15}}>
            <Loading width={100} height={100} />
          </View>
        )}

        {/* Category  */}
        <View
          style={{
            marginTop: 20,
            paddingHorizontal: 5,
          }}>
          <FlatList
            horizontal={true}
            data={category}
            renderItem={({item}) => {
              let title = item.title;
              return (
                <TouchableOpacity
                  onPress={() => {
                    get_categpory_News_Data(item.title);
                    setSelectedCategoryId(item.id);
                    setTopCategoryNewsData([]);
                  }}
                  style={{
                    paddingHorizontal: 15,
                    paddingVertical: 5,
                    borderBottomWidth: 1,
                    borderColor:
                      item.id == selectedCategoryId
                        ? theme.COLORS.PRIMARY
                        : '#E9E9E9',
                  }}>
                  <Text
                    style={{
                      fontWeight:
                        item.id == selectedCategoryId ? 'bold' : '400',
                      color:
                        item.id == selectedCategoryId
                          ? theme.COLORS.PRIMARY
                          : 'grey',
                      fontSize: 16,
                    }}>
                    {title.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>

        {/* Blog List  */}
        {topCategoryNewsData.length > 0 ? (
          <ScrollView contentContainerStyle={{paddingVertical: 15}}>
            {topCategoryNewsData.map(item => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('detailScreen', {
                      data: item,
                    })
                  }
                  style={{
                    marginHorizontal: 15,
                    padding: 10,
                    backgroundColor: '#fff',
                    elevation: 4,
                    borderRadius: 10,
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginVertical: 8,
                  }}>
                  <View
                    style={{
                      width: '35%',
                      height: 85,
                      // elevation: 3,
                      backgroundColor: 'rgba(0,0,0,.3)',
                      borderRadius: 8,
                      overflow: 'hidden',
                    }}>
                    {console.log('lele mera: ', item.image)}
                    {item.image != null ? (
                      <Image
                        source={{
                          uri: item.image,
                        }}
                        style={{width: '100%', height: '100%'}}
                        resizeMode="stretch"
                      />
                    ) : (
                      <Image
                        source={require('../assets/images/logo/logo2.png')}
                        style={{width: '100%', height: '100%'}}
                        resizeMode="contain"
                      />
                    )}
                  </View>
                  <View style={{height: '100%', flex: 1, paddingLeft: 10}}>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'flex-start',
                      }}>
                      <Text
                        style={{
                          color: '#000',
                          fontWeight: 'bold',
                          fontSize: 16,
                        }}
                        numberOfLines={2}>
                        {item.title}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                      }}>
                      {item.author != null ? (
                        <Text style={{fontSize: 12, color: '#000'}}>
                          {item.author}
                        </Text>
                      ) : null}

                      {item.published_at != null ? (
                        <Text style={{fontSize: 10, color: '#000'}}>
                          {item.published_at}
                        </Text>
                      ) : null}
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
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

export default HomeScreen;
