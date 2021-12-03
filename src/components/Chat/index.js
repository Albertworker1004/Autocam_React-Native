import React from 'react';
import {View, Text} from 'react-native';

import {Input, Icon} from 'react-native-elements';

import colors from '~/styles';
import styles from './styles';

const Chat = ({user, date, message}) => {
  return (
    <View style={styles.card}>
      <View style={styles.list}>
        <View style={{flexDirection: 'row'}}>
          <Icon name="person" type="material" color={colors.darkGrey} />
          <Text style={styles.title}>{user}</Text>
        </View>

        <Text style={styles.title}>{date}</Text>
      </View>
      <Input
        disabled
        inputContainerStyle={styles.input}
        inputStyle={{
          fontSize: 18,
          color: colors.opacityWhite,
          textAlignVertical: 'top',
        }}
        placeholder={message}
        placeholderTextColor={colors.darkestGrey}
        multiline={true}
        numberOfLines={3}
      />
    </View>
  );
};

export default Chat;
