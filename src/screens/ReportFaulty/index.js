import React, {useContext, useState} from 'react';
import {ImageBackground, StatusBar, View, Text, ScrollView} from 'react-native';
import {NavigationContext} from 'react-navigation';
import {useHeaderHeight} from 'react-navigation-stack';
import {Icon} from 'react-native-elements';
import RNBottomActionSheet from 'react-native-bottom-action-sheet';
import colors from '~/styles';
import styles from './styles';
import ButtonComponent from '~/components/Button';
import bg from '~/assets/background-white/whiteBg.png';
import SerialNumber from '~/components/SerialNumber';
const ReportFaulty = () => {
  const navigation = useContext(NavigationContext);
  const [serialAmount, setSerialAmount] = useState([0]);
  const [sheetView, setSheetView] = useState(false);

  const pushSerialAmount = () => {
    setSerialAmount([...serialAmount, 0]);
  };

  return (
    <ImageBackground source={bg} style={styles.container} resizeMode="cover">
      <StatusBar barStyle="light-content" backgroundColor="white" />
      <ScrollView
        style={[
          styles.listContainer,
          {marginTop: useHeaderHeight() + useHeaderHeight() / 8},
        ]}>
        {serialAmount.map((amount, index) => (
          <SerialNumber
            key={index}
            openPopup={() => setSheetView(!sheetView)}
          />
        ))}

        <View style={{borderTopWidth: 0.5, marginBottom: '4%'}} />

        <View style={{paddingVertical: '5%'}}>
          <ButtonComponent
            title="Add More Devices"
            onPress={() => pushSerialAmount()}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={[styles.title, {fontWeight: 'bold', paddingRight: '5%'}]}>
              RMA Invoice:
            </Text>
            <Icon name="backup" color={'#676767'} size={50} />
          </View>
          <View style={{paddingVertical: '5%'}}>
            <ButtonComponent
              title="Request Pickup"
              onPress={() => navigation.navigate('Rma')}
            />
          </View>
        </View>
      </ScrollView>
      <RNBottomActionSheet.SheetView
        visible={sheetView}
        title={'Capture Serial Number!'}
        theme={'light'}
        titleTextColor={colors.darkGrey}
        itemTextColor={colors.grey}
        backgroundColor={'#C0C0C0'}
        delayDismissOnItemClick={true}
        onSelection={() => setSheetView(!sheetView)}
        onCancel={() => setSheetView(!sheetView)}>
        <RNBottomActionSheet.SheetView.Item
          title={'Take Picture of Serial Number'}
        />
        <RNBottomActionSheet.SheetView.Item title={'Enter Manually'} />
        <RNBottomActionSheet.SheetView.Item title={'Cancel'} />
      </RNBottomActionSheet.SheetView>
    </ImageBackground>
  );
};

export default ReportFaulty;
