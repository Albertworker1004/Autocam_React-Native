import React, {useContext, useState} from 'react';
import {ImageBackground, StatusBar, View, Text, Alert} from 'react-native';
import {NavigationContext} from 'react-navigation';
import {useHeaderHeight} from 'react-navigation-stack';
import {Input} from 'react-native-elements';
import Button from '~/components/Button';
import api from '~/server/index';
import {formatPresentDate} from '~/utils';
import styles from './styles';
import bg from '~/assets/background-white/whiteBg.png';
import {Context as UserContext} from '~/Store/index';
const CreateRequest = () => {
  const navigation = useContext(NavigationContext);

  const [subject, setSubject] = useState('');
  const {user} = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const filterData = async () => {
    if (subject === '' || message === '') {
      return Alert.alert(
        'Empty Fields',
        'fill in the required fields',
        [{text: 'OK'}],
        {cancelable: false},
      );
    }

    try {
      setLoading(true);
      const res = await sendData();

      res.status === 200
        ? clearInput()
        : Alert.alert(
            'Something went wrong!',
            'Please check the subject and message again!',
            [{text: 'OK'}],
            {cancelable: false},
          );
    } catch (err) {
      throw err;
    }

    setLoading(false);
  };

  const sendData = async () => {
    const data = new FormData();
    data.append('posterID', user.userID);
    data.append('request_title', subject);
    data.append('request_content', message);
    data.append('create_time', formatPresentDate());

    const headers = {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
    };

    try {
      const res = await api.post('/user/create_request', data, headers);
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  const clearInput = () => {
    setMessage('');
    setSubject('');
    navigation.push('Requests');
  };

  return (
    <ImageBackground source={bg} style={styles.container} resizeMode="cover">
      <StatusBar barStyle="light-content" backgroundColor="white" />
      <View
        style={[
          styles.formView,
          {marginTop: useHeaderHeight() + useHeaderHeight() / 4},
        ]}>
        <View style={styles.topLine} />
        <View style={styles.card}>
          <View style={styles.list}>
            <Text style={styles.title}>Subject</Text>
          </View>
          <View>
            <Input
              inputContainerStyle={styles.inputContainerStyle}
              inputStyle={styles.inputStyle}
              value={subject}
              placeholder="What do you need now?"
              onChangeText={(text) => setSubject(text)}
            />
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.list}>
            <Text style={styles.title}>Message</Text>
          </View>
          <View>
            <Input
              inputContainerStyle={styles.inputContainerStyle}
              inputStyle={styles.inputStyle}
              value={message}
              placeholder="What can we help now?"
              multiline={true}
              numberOfLines={8}
              onChangeText={(text) => setMessage(text)}
            />
          </View>
        </View>
      </View>
      <View style={styles.button}>
        <Button title="Submit" onPress={() => filterData()} loading={loading} />
      </View>
    </ImageBackground>
  );
};

export default CreateRequest;
