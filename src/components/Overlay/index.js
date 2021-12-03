import React from 'react';
import {View, StyleSheet} from 'react-native';

const Overlay = ({behind, front}) => {
  return (
    <View style={styles.fullView}>
      <View style={styles.behind}>{behind}</View>
      <View style={styles.front}>{front}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  fullView: {
    position: 'relative',
    margin: 0,
    padding: 0,
  },
  front: {
    position: 'absolute',
    width: '100%',
    height: 50,
    zIndex: 10,
  },
  back: {
    backgroundColor: 'transparent',
    position: 'absolute',
    width: '100%',
    height: 50,
  },
});

export default Overlay;
