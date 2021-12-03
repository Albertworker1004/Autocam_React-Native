import React from 'react';
import {Text, View} from 'react-native';
import styles from './styles';

const Chat = ({message = 'Loading...', customStyles = {}}) => {
  return (
    <View style={{...styles.view, ...customStyles}}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

export default Chat;
