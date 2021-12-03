import React, {useState, useContext, useEffect} from 'react';
import {
  ImageBackground,
  StatusBar,
  View,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Context} from '~/Store/index';

import ImagePicker from 'react-native-image-picker';

import {NavigationContext} from 'react-navigation';
import api from '~/server/index';

import Logo from '~/components/Logo';
import Profile from '~/components/ProfilePicture';
import Button from '~/components/Button';
import Input from '~/components/Input';

import styles from './styles';
import bg from '~/assets/background/bg.png';
import emptyProfile from '~/assets/emptyProfile/empty-profile.png';

const CreateAccount = () => {
  const navigation = useContext(NavigationContext);
  const {user, setUser} = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [avatarSource, setAvatarSource] = useState(null);

  useEffect(() => {
    try {
      setId(user.userID);
    } catch (err) {
      console.log(err);
      // Error retrieving data
      throw err;
    }
  }, []);

  const filterData = async () => {
    if (city === '' || country === '' || phoneNumber === '') {
      return Alert.alert(
        'Empty Fields',
        'fill in the required fields',
        [{text: 'OK'}],
        {cancelable: false},
      );
    }
    try {
      setId(user.userID);
      setLoading(true);
      const res = await sendData();
      setUser(res.userinfo);
      res.status === 200
        ? clearInput()
        : Alert.alert(
            'Something went wrong!',
            'Please check all fields again!',
            [{text: 'OK'}],
            {cancelable: false},
          );
    } catch (err) {
      throw err;
    }

    setLoading(false);
  };

  const sendData = async () => {
    const data = new FormData();
    data.append('userID', id);
    data.append('city', city);
    data.append('country', country);
    data.append('phonenumber', phoneNumber);
    data.append('company_name', companyName);
    data.append('company_address', companyAddress);
    avatarSource &&
      data.append('photo', {
        uri: avatarSource.uri,
        type: avatarSource.type,
        name: avatarSource.name,
      });

    const headers = {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
    };

    try {
      const res = await api.post('/user/user_update_profile', data, headers);
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  const clearInput = () => {
    setCity('');
    setCountry('');
    setPhoneNumber('');
    setCompanyName('');
    setCompanyAddress('');
    setAvatarSource(null);
    navigation.navigate('Products');
  };

  const options = {
    title: 'Select Avatar',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const selectImage = async () => {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {
          uri: response.uri,
          type: response.type,
          name: response.fileName,
        };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        setAvatarSource(source);
      }
    });
  };

  return (
    <ImageBackground source={bg} style={styles.container} resizeMode="cover">
      <StatusBar barStyle="light-content" backgroundColor="white" />
      <View style={{flex: 0.8}}>
        {avatarSource && (
          <TouchableOpacity onPress={() => selectImage()}>
            <Profile img={avatarSource} lessMargin />
          </TouchableOpacity>
        )}

        {!avatarSource && (
          <TouchableOpacity onPress={() => selectImage()}>
            <Logo img={emptyProfile} lessMargin />
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        style={{width: '100%', flex: 1.5}}
        showsVerticalScrollIndicator={false}>
        <Input
          content="Phone Number"
          value={phoneNumber}
          setInputValue={(text) => setPhoneNumber(text)}
        />
        <Input
          content="Company Name"
          value={companyName}
          setInputValue={(text) => setCompanyName(text)}
        />
        <Input
          content="Company Address"
          value={companyAddress}
          setInputValue={(text) => setCompanyAddress(text)}
        />
        <Input
          content="City"
          value={city}
          setInputValue={(text) => setCity(text)}
        />
        <Input
          content="Country"
          value={country}
          setInputValue={(text) => setCountry(text)}
        />
      </ScrollView>

      <View style={[styles.button, {flex: 0.2}]}>
        <Button
          noAuth
          title="Save"
          onPress={() => filterData()}
          loading={loading}
        />
      </View>
    </ImageBackground>
  );
};

export default CreateAccount;
