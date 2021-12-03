import React from 'react';
import {
  ImageBackground,
  StatusBar,
  View,
  Text,
  Dimensions,
  ScrollView,
} from 'react-native';
import {useHeaderHeight} from 'react-navigation-stack';
import colors from '~/styles';
import styles from './styles';
import bg from '~/assets/background-white/whiteBg.png';

const UserGuide = () => {
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
        <ScrollView>
          <View style={styles.list}>
            <Text
              style={{
                fontSize: 20,
                color: colors.lightGrey,
                textAlign: 'left',
              }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Tempus
              imperdiet nulla malesuada pellentesque elit eget gravida cum.
              Venenatis a condimentum vitae sapien. Elit ullamcorper dignissim
              cras tincidunt lobortis feugiat vivamus at augue. Sit amet
              consectetur adipiscing elit. Lorem donec massa sapien faucibus et
              molestie ac. Cras sed felis eget velit aliquet sagittis id
              consectetur purus. At erat pellentesque adipiscing commodo elit at
              imperdiet. Lectus urna duis convallis convallis tellus id
              interdum. Augue neque gravida in fermentum et sollicitudin ac.
              Sagittis purus sit amet volutpat consequat mauris nunc congue.
              Urna cursus eget nunc scelerisque viverra mauris. Adipiscing vitae
              proin sagittis nisl rhoncus mattis rhoncus urna neque. A
              scelerisque purus semper eget duis. Netus et malesuada fames ac.
              Mi sit amet mauris commodo quis imperdiet massa. Amet consectetur
              adipiscing elit ut aliquam purus sit
            </Text>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default UserGuide;
