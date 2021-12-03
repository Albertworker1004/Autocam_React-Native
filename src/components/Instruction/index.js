import React from 'react';
import {Text, StyleSheet, Dimensions} from 'react-native';

import colors from '~/styles';

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    color: colors.darkGrey,
    fontSize: 15,
    paddingVertical: (Dimensions.get('window').height * 0.1) / 4,
    paddingHorizontal: (Dimensions.get('window').width * 0.1) / 0.8,
  },
});

const Instruction = ({content}) => <Text style={styles.text}>{content}</Text>;

export default Instruction;
