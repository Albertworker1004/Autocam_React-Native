import React, {useContext} from 'react';
import {NavigationContext} from 'react-navigation';
import {
  ImageBackground,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {useHeaderHeight} from 'react-navigation-stack';
import colors from '~/styles';
import styles from './styles';
import bg from '~/assets/background-white/whiteBg.png';

const Material = () => {
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
        <TouchableOpacity onPress={() => navigation.navigate('Brochure')}>
          <View style={styles.list}>
            <Text
              style={{
                fontSize: 20,
                color: colors.lightGrey,
              }}>
              Brochure
            </Text>
            <Icon
              name="navigate-next"
              type="material"
              color={colors.lightGrey}
              size={50}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('UserGuide')}>
          <View style={styles.list}>
            <Text
              style={{
                fontSize: 20,
                color: colors.lightGrey,
              }}>
              User Guide
            </Text>
            <Icon
              name="navigate-next"
              type="material"
              color={colors.lightGrey}
              size={50}
            />
          </View>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Material;
