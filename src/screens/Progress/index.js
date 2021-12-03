import React, {useContext, useState} from 'react';
import {NavigationContext} from 'react-navigation';
import {
  ImageBackground,
  StatusBar,
  View,
  Text,
  Dimensions,
  Image,
} from 'react-native';
import Timeline from '~/components/Timeline';
import {useHeaderHeight} from 'react-navigation-stack';
import colors from '~/styles';
import bg from '~/assets/background-white/whiteBg.png';
import styles from './styles';

const Progress = () => {
  const navigation = useContext(NavigationContext);
  const name = navigation.getParam('name');
  const repairCost = navigation.getParam('repairCost');
  const avatar = navigation.getParam('avatar');
  const [progress, setProgress] = useState(Math.floor(Math.random() * 6));
  const [sliderHeight, setSliderHeight] = useState(0);

  const heightOfView = (layout) => {
    const {height} = layout;
    return setSliderHeight(height);
  };
  return (
    <ImageBackground source={bg} style={styles.container} resizeMode="cover">
      <StatusBar barStyle="light-content" backgroundColor="white" />
      <View style={{marginTop: useHeaderHeight() + useHeaderHeight() / 8}}>
        <View
          style={{
            borderTopWidth: 0.8,
            marginHorizontal: (Dimensions.get('window').width * 0.2) / 4,
          }}
        />
        <View>
          <View style={styles.list}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={styles.productBg}>
                <Image source={avatar} style={styles.productImage} />
              </View>
              <View style={{paddingLeft: '5%'}}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 22,
                    color: colors.lightGrey,
                  }}>
                  {name}
                </Text>

                <Text
                  style={{
                    color: colors.lightGrey,
                    fontSize: 13,
                  }}>
                  Repair cost:{repairCost}
                </Text>
              </View>
            </View>
          </View>
          <View style={{flexDirection: 'row', height: '100%'}}>
            <View
              style={{
                flex: 1,
                alignSelf: 'baseline',
                height: '50%',
              }}
              onLayout={(event) => {
                heightOfView(event.nativeEvent.layout);
              }}>
              <Timeline sliderHeight={sliderHeight} progress={progress} />
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Progress;
