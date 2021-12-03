import React, {useState} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import Timeline from 'react-native-timeline-flatlist';
import colors from '~/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
  list: {
    paddingTop: '5%',
    borderRadius: 5,
  },
});

const TimelineProgress = ({sliderHeight}) => {
  const [data] = useState([
    {
      title:
        Platform.OS === 'ios' ? '\nDevice is Recieved\n' : 'Device is Received',
      lineColor: '#E18700',
    },
    {
      title: Platform.OS === 'ios' ? '\nDevice is Fixed\n' : 'Device is Fixed',
      lineColor: '#E18700',
    },
    {
      title:
        Platform.OS === 'ios'
          ? '\nInvoice is Generated\n'
          : 'Invoice is Generated',
      lineColor: '#C0C0C0',
      circleColor: '#C0C0C0',
    },
    {
      title:
        Platform.OS === 'ios' ? '\nDevice is Shipping\n' : 'Device is Shipping',
      lineColor: '#C0C0C0',
      circleColor: '#C0C0C0',
    },
    {
      title:
        Platform.OS === 'ios'
          ? '\nDevice is Recieved Back\n'
          : 'Device is Recieved Back',
      lineColor: '#C0C0C0',
      circleColor: '#C0C0C0',
    },
  ]);

  return (
    <View style={styles.container}>
      <Timeline
        circleSize={40}
        lineWidth={10}
        renderFullLine={true}
        circleColor="#E18700"
        circleStyle={{alignSelf: 'center'}}
        rowContainerStyle={{
          height: Platform.OS === 'ios' ? null : sliderHeight / 6,
        }}
        titleStyle={{
          color: colors.lightGrey,
          fontSize: 17,
          fontWeight: 'normal',
          paddingTop: Platform.OS === 'ios' ? null : '5%',
        }}
        style={styles.list}
        data={data}
      />
    </View>
  );
};

export default TimelineProgress;
