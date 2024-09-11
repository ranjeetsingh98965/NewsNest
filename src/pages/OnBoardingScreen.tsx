import React, {useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  ImageBackground,
  BackHandler,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';
import theme from '../constants/theme';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OnBoardingScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [nameWarning, setNameWarning] = useState(false);
  const [gender, setGender] = useState('');
  const [genderWarning, setGenderWarning] = useState(false);
  const [detailModal, setDetailModal] = useState(true);

  //  Store data in async Storage
  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error('Error saving data', error);
    }
  };

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

  return (
    <>
      <View style={{flex: 1}}>
        <StatusBar
          animated={true}
          barStyle={'dark-content'}
          backgroundColor={theme.COLORS.WHITE}
        />
        <ImageBackground
          source={require('../assets/images/onBoarding.jpg')}
          style={{
            width: '100%',
            height: '100%',
          }}
          resizeMode="cover">
          <View
            style={{
              marginTop: '40%',
              width: '100%',
              paddingHorizontal: 15,
            }}>
            <Text
              style={{
                fontSize: 50,
                width: '80%',
                fontWeight: 'bold',
                color: theme.COLORS.WHITE,
              }}>
              Explore Your News
            </Text>
          </View>
          <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('homeScreen')}
              style={{
                marginBottom: '20%',
                backgroundColor: theme.COLORS.GREEN,
                marginHorizontal: 15,
                borderRadius: 10,
                paddingVertical: 15,
                justifyContent: 'center',
                alignItems: 'center',
                elevation: 5,
                // borderWidth: 1,
                borderColor: theme.COLORS.WHITE,
              }}>
              <Text
                style={{
                  color: theme.COLORS.WHITE,
                  fontWeight: 'bold',
                  fontSize: 16,
                }}>
                GET STARTED
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>

      <Modal transparent={true} visible={detailModal} animationType="fade">
        <StatusBar
          animated={true}
          barStyle={'dark-content'}
          backgroundColor={'rgba(0,0,0,.6)'}
        />
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,.6)',
            justifyContent: 'center',
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              marginHorizontal: 20,
              borderRadius: 10,
              paddingHorizontal: 20,
              paddingBottom: 20,
              paddingTop: 8,
            }}>
            <Text style={styles.heading}>Enter Your Name</Text>
            <View style={{...styles.textField, overflow: 'hidden'}}>
              <Icon name="account" size={30} color="grey" />
              <TextInput
                placeholder="Name"
                placeholderTextColor={'grey'}
                onChangeText={txt => {
                  setName(txt);
                  setNameWarning(false);
                }}
                style={{
                  fontSize: 16,
                  paddingHorizontal: 10,
                  color: theme.COLORS.BLACK,
                  width: '100%',
                }}
              />
            </View>
            {nameWarning ? (
              <Text
                style={{color: theme.COLORS.RED, fontSize: 12, marginTop: 2}}>
                Enter name is required!
              </Text>
            ) : null}

            <Text
              style={{
                ...styles.heading,
                marginTop: 20,
              }}>
              Select Your Gender
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <TouchableOpacity
                onPress={() => {
                  setGender('male');
                  setGenderWarning(false);
                }}
                style={{
                  flex: 1,
                  alignItems: 'flex-start',
                  flexDirection: 'row',
                }}>
                {gender == 'male' ? (
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      backgroundColor: theme.COLORS.PRIMARY,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 4,
                    }}>
                    <Icon name="check" size={15} color="#fff" />
                  </View>
                ) : (
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderWidth: 1,
                      borderColor: 'grey',
                      borderRadius: 4,
                    }}
                  />
                )}
                <Text style={{color: theme.COLORS.BLACK, paddingHorizontal: 5}}>
                  Male
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setGender('female');
                  setGenderWarning(false);
                }}
                style={{
                  flex: 1,
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  flexDirection: 'row',
                }}>
                {gender == 'female' ? (
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      backgroundColor: theme.COLORS.PRIMARY,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 4,
                    }}>
                    <Icon name="check" size={15} color="#fff" />
                  </View>
                ) : (
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderWidth: 1,
                      borderColor: 'grey',
                      borderRadius: 4,
                    }}
                  />
                )}

                <Text style={{color: theme.COLORS.BLACK, paddingHorizontal: 5}}>
                  Female
                </Text>
              </TouchableOpacity>
            </View>
            {genderWarning ? (
              <Text
                style={{color: theme.COLORS.RED, fontSize: 12, marginTop: 2}}>
                Checkbox must be checked is required.
              </Text>
            ) : null}

            {/* Submit btn  */}
            <TouchableOpacity
              onPress={() => {
                if (name != '' && gender != '') {
                  setDetailModal(false);
                  storeData('name', name);
                  storeData('gender', gender);
                } else if (name == '' && gender == '') {
                  setNameWarning(true);
                  setGenderWarning(true);
                } else if (name == '') {
                  setNameWarning(true);
                } else if (gender == '') {
                  setGenderWarning(true);
                }
              }}
              style={{
                backgroundColor: theme.COLORS.PRIMARY,
                borderRadius: 10,
                paddingVertical: 10,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 30,
              }}>
              <Text
                style={{
                  color: theme.COLORS.WHITE,
                  fontWeight: 'bold',
                  fontSize: 16,
                }}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};
const styles = StyleSheet.create({
  textField: {
    flexDirection: 'row',
    alignItems: 'center',
    // elevation: 3,
    borderWidth: 1,
    borderColor: 'grey',
    backgroundColor: theme.COLORS.WHITE,
    borderRadius: 10,
    marginTop: 10,
    paddingLeft: 5,
  },
  heading: {
    color: theme.COLORS.BLACK,
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 10,
  },
});

export default OnBoardingScreen;
