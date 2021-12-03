import React, {useContext, useState} from 'react';
import {
  ImageBackground,
  StatusBar,
  View,
  Text,
  Image,
  Alert,
  Platform,
} from 'react-native';
import {NavigationContext} from 'react-navigation';

import api from '~/server/index';
import {Context} from '~/Store/index';

import {CheckBox} from 'react-native-elements';

import Logo from '~/components/Logo';
import Button from '~/components/Button';
import Input from '~/components/Input';

import styles from './styles';
import bg from '~/assets/background/bg.png';
import logo from '~/assets/logo/logo.png';

import checkboxChecked from '~/assets/checkbox/check.png';
import checkboxUnchecked from '~/assets/checkbox/unchecked.png';

const Signup = () => {
  const navigation = useContext(NavigationContext);
  const {setUser} = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const filterData = async () => {
    if (!checked) {
      return Alert.alert(
        'Unchecked Field',
        'To create an account you need to accept our terms',
        [{text: 'OK'}],
        {cancelable: false},
      );
    }
    if (fullname === '' || password === '' || email === '') {
      return Alert.alert(
        'Empty Fields',
        'fill in the required fields',
        [{text: 'OK'}],
        {cancelable: false},
      );
    }
    if (password !== confirmPassword) {
      return Alert.alert(
        'Password problem!!',
        'Password and confirm password are not the same!',
        [{text: 'OK'}],
        {cancelable: false},
      );
    }

    try {
      setLoading(true);
      const res = await sendData();
      if (res.status === 200) {
        setUser({userID: res.userinfo.userID});
        return clearInput();
      }
      return Alert.alert(
        'Something is wrong!!',
        'Please check all fields again!',
        [{text: 'OK'}],
        {cancelable: false},
      );
    } catch (err) {
      throw err;
    }
  };

  const sendData = async () => {
    const data = new FormData();
    data.append('fullname', fullname);
    data.append('email', email);
    data.append('password', password);
    data.append('device_type', Platform.OS === 'ios' ? '0' : '1');

    const headers = {
      'Content-Type': 'multipart/form-data',
    };

    try {
      const res = await api.post('/user/user_signup', data, headers);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const clearInput = () => {
    setFullname('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    navigation.navigate('CreateAccount');
  };
  return (
    <ImageBackground source={bg} style={styles.container} resizeMode="cover">
      <StatusBar barStyle="light-content" backgroundColor="white" />

      <Logo img={logo} lessMargin />
      <Input
        content="Full Name"
        value={fullname}
        setInputValue={(text) => setFullname(text)}
      />
      <Input
        content="Email Address"
        value={email}
        setInputValue={(text) => setEmail(text)}
      />
      <Input
        content="Password"
        password
        value={password}
        setInputValue={(text) => setPassword(text)}
      />
      <Input
        content="Confirm Password"
        password
        value={confirmPassword}
        setInputValue={(text) => setConfirmPassword(text)}
      />

      <CheckBox
        center
        title={
          <Text style={styles.instructions}>
            I have read and agree to your{' '}
            <Text style={styles.underline}>Privacy policy </Text> and{' '}
            <Text style={styles.underline}>Terms of Use </Text>
          </Text>
        }
        iconLeft
        type="material"
        checkedIcon={
          <Image source={checkboxChecked} style={{width: 30, height: 30}} />
        }
        uncheckedIcon={
          <Image source={checkboxUnchecked} style={{width: 30, height: 30}} />
        }
        checked={checked}
        containerStyle={styles.instructionsContainer}
        onPress={() => setChecked(!checked)}
      />

      <View style={styles.bottomView}>
        <Button
          noAuth
          title="Sign Up"
          onPress={() => {
            filterData().then(() => setLoading(false));
          }}
          loading={loading}
        />

        <View>
          <Text style={[styles.bottomInstructions]}>
            Already Have An Account?
          </Text>

          <Button
            noAuth
            title="Log In"
            onPress={() => navigation.navigate('Login')}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default Signup;
