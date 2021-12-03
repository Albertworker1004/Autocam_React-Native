import React, {useContext, useState} from 'react';
import {NavigationContext} from 'react-navigation';
import {
  ImageBackground,
  StatusBar,
  View,
  Text,
  Dimensions,
  ScrollView,
} from 'react-native';
import CheckBox from '~/components/Checkbox';
import {useHeaderHeight} from 'react-navigation-stack';
import colors from '~/styles';
import styles from './styles';
import bg from '~/assets/background-white/whiteBg.png';
import Button from '~/components/Button';

import myInvoices from '~/config/myInvoices';

const MyInvoices = () => {
  const navigation = useContext(NavigationContext);

  return (
    <ImageBackground source={bg} style={styles.container} resizeMode="cover">
      <StatusBar barStyle="light-content" backgroundColor="white" />
      <View style={{marginTop: useHeaderHeight() + useHeaderHeight() / 4}}>
        <View
          style={{
            borderTopWidth: 0.8,
            marginHorizontal: (Dimensions.get('window').width * 0.2) / 4,
          }}
        />
        {myInvoices.map((invoice, index) => (
          <ScrollView style={styles.scrollview} key={index}>
            <View style={styles.list}>
              <CheckBox
                center
                title={'Inv 10' + index++}
                color={colors.grey}
                fontSize={20}
              />
              <Text
                style={{
                  fontSize: 20,
                  color: colors.lightGrey,
                  paddingLeft: '2%',
                }}>
                {invoice.name}
              </Text>
            </View>
          </ScrollView>
        ))}
      </View>
      <View style={styles.button}>
        <Button
          title="Email Invoices"
          onPress={() => navigation.navigate('Billing')}
        />
      </View>
    </ImageBackground>
  );
};

export default MyInvoices;
