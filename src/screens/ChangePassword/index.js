import React, {useContext} from 'react';
import {ImageBackground, StatusBar, View} from 'react-native';
import {NavigationContext} from 'react-navigation';
import {useHeaderHeight} from 'react-navigation-stack';

import Logo from '~/components/Logo';
import Button from '~/components/Button';
import Input from '~/components/Input';
import Instruction from '~/components/Instruction';

import styles from './styles';
import bg from '~/assets/background/bg.png';
import logo from '~/assets/logo/logo.png';

const ChangePassword = () => {
  const navigation = useContext(NavigationContext);

  return (
    <ImageBackground source={bg} style={styles.container} resizeMode="cover">
      <StatusBar barStyle="light-content" backgroundColor="white" />

      <Logo img={logo} />

      <Instruction content="Enter your new password." />
      <Input content="New Password" password />
      <Input content="Confirm Password" password />

      <View style={styles.bottomView}>
        <Button
          noAuth
          title="Confirm"
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </ImageBackground>
  );
};

export default ChangePassword;
