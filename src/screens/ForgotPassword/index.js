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

const RecoverPassword = () => {
  const navigation = useContext(NavigationContext);

  return (
    <ImageBackground source={bg} style={styles.container} resizeMode="cover">
      <StatusBar barStyle="light-content" backgroundColor="white" />

      <Logo img={logo} />

      <Instruction
        style={styles.instructions}
        content="Enter your email and we will send you a 
      verification code to reset your password."
      />
      <Input content="Email Address" />
      <View style={styles.bottomView}>
        <Button
          noAuth
          title="Continue"
          onPress={() => navigation.navigate('ConfirmCode')}
        />
      </View>
    </ImageBackground>
  );
};

export default RecoverPassword;
