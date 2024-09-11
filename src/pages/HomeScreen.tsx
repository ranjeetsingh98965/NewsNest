import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  BackHandler,
  ScrollView,
} from 'react-native';
import theme from '../constants/theme';
import Banner from '../components/Banner';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TRANDING_NEWS_API} from '@env';
import axios from 'axios';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [selectedCategoryId, setSelectedCategoryId] = useState(1);
  const [greeting, setGreeting] = useState('');
  const [name, setName] = useState('Guest');
  const [gender, setGender] = useState('');
  const [topTrandingNewsData, setTopTrandingNewsData] = useState([]);

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

  useEffect(() => {
    getNameAndGender();
    get_Top_News_Data();
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

  const bannerData = [
    {
      id: 1,
      title: 'lulu 1',
      description: 'lkj',
      uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRbKnG--JqNfXHh0OXOQgveASbG2ZDeOrpcQ&s',
    },
    {
      id: 2,
      title: 'lulu 1',
      description: 'lkj',
      uri: 'https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630',
    },
    {
      id: 3,
      title: 'lulu 1',
      description: 'lkj',
      uri: 'https://imgv3.fotor.com/images/slider-image/A-clear-close-up-photo-of-a-woman.jpg',
    },
  ];

  const category = [
    {
      id: 1,
      title: 'MOBILE',
    },
    {
      id: 2,
      title: 'GADGETS',
    },
    {
      id: 3,
      title: 'DESIGN',
    },
    {
      id: 4,
      title: 'PHOTOGRAPHY',
    },
    {
      id: 5,
      title: 'REVIEWS',
    },
  ];

  const blogList = [
    {
      id: 1,
      title: 'Lorem ipsum dolor sit amet consectetur.',
      owner: '@Crazy Technology',
      date: 'April 27, 2023',
      uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRbKnG--JqNfXHh0OXOQgveASbG2ZDeOrpcQ&s',
    },
    {
      id: 2,
      title: 'Lorem ipsum dolor sit amet consectetur.',
      owner: '@Crazy Technology',
      date: 'April 27, 2023',
      uri: 'https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630',
    },
    {
      id: 3,
      title: 'Lorem ipsum dolor sit amet consectetur.',
      owner: '@Crazy Technology',
      date: 'April 27, 2023',
      uri: 'https://imgv3.fotor.com/images/slider-image/A-clear-close-up-photo-of-a-woman.jpg',
    },
    {
      id: 4,
      title: 'Lorem ipsum dolor sit amet consectetur.',
      owner: '@Crazy Technology',
      date: 'April 27, 2023',
      uri: 'https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171_1280.jpg',
    },
    {
      id: 5,
      title: 'Lorem ipsum dolor sit amet consectetur.',
      owner: '@Crazy Technology',
      date: 'April 27, 2023',
      uri: 'https://media.istockphoto.com/id/1132010479/vector/wow-comic-sound-effect-speech-balloon.jpg?s=612x612&w=0&k=20&c=Tnvhbu-rPLf3q3_naS9RhPfLKF91KppHP1M5kqQivXs=',
    },
  ];

  return (
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
          style={{color: theme.COLORS.BLACK, fontWeight: 'bold', fontSize: 20}}>
          {greeting}
        </Text>
      </View>

      {/* Banner  */}
      {bannerData.length > 0 ? (
        <View style={{height: 200, marginTop: 15}}>
          <Banner data={topTrandingNewsData} />
        </View>
      ) : null}

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
            return (
              <TouchableOpacity
                onPress={() => setSelectedCategoryId(item.id)}
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
                    fontWeight: item.id == selectedCategoryId ? 'bold' : '400',
                    color:
                      item.id == selectedCategoryId
                        ? theme.COLORS.PRIMARY
                        : 'grey',
                    fontSize: 16,
                  }}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* Blog List  */}
      <ScrollView contentContainerStyle={{paddingVertical: 15}}>
        {blogList.map(item => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('detailScreen')}
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
                  elevation: 3,
                  backgroundColor: theme.COLORS.BLACK,
                  borderRadius: 8,
                  overflow: 'hidden',
                }}>
                <Image
                  source={{
                    uri: item.uri,
                  }}
                  style={{width: '100%', height: '100%'}}
                  resizeMode="cover"
                />
              </View>
              <View style={{height: '100%', flex: 1, paddingLeft: 10}}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'flex-start',
                  }}>
                  <Text
                    style={{color: '#000', fontWeight: 'bold', fontSize: 16}}
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
                  <Text style={{fontSize: 12, color: '#000'}}>
                    {item.owner}
                  </Text>
                  <Text style={{fontSize: 9, color: 'grey'}}>{item.date}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
