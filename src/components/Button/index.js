import React from 'react';

import {StyleSheet, Dimensions} from 'react-native';
import {Button} from 'react-native-elements';
import colors from '~/styles';

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    backgroundColor: colors.darkWhite,
    borderColor: colors.lightestGrey,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderBottomWidth: 2,
    borderRadius: 3,
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 8,
  },
  marginNoAuth: {
    marginHorizontal: (Dimensions.get('window').width * 0.1) / 2,
    width: Dimensions.get('window').width * 0.8,
  },
  marginAuth: {
    marginHorizontal: '10%',
    width: '80%',
  },
});

const Btn = ({
  title,
  onPress,
  noAuth,
  loading,
  customContainerStyle = false,
  customTitleStyle = false,
}) => (
  <Button
    loading={loading ? true : false}
    title={title}
    buttonStyle={
      customContainerStyle
        ? [customContainerStyle]
        : [styles.button, noAuth ? styles.marginNoAuth : styles.marginAuth]
    }
    titleStyle={customTitleStyle || {color: colors.lightGrey}}
    onPress={onPress}
  />
);

export default Btn;
