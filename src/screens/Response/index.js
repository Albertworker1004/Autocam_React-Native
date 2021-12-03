import React, {useState, useLayoutEffect, useContext, useCallback} from 'react';
import {NavigationContext} from 'react-navigation';
import {
  ImageBackground,
  StatusBar,
  View,
  ScrollView,
  Dimensions,
  ToastAndroid,
  RefreshControl,
} from 'react-native';
import {Button, Overlay, Input} from 'react-native-elements';
import {useHeaderHeight} from 'react-navigation-stack';

import colors from '~/styles';
import styles from './styles';
import bg from '~/assets/background-white/whiteBg.png';

import {formatPresentDate, convertByTimeZone} from '~/utils';

import Chat from '~/components/Chat';
import Loader from '~/components/Loader';
import {Context as UserContext} from '~/Store/index';

import api from '~/server/index';

const Response = () => {
  // States
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [responses, setResponses] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  // contexts
  const navigation = useContext(NavigationContext);
  const {user} = useContext(UserContext);

  const requestID = navigation.state.params.requestID;

  const getResponses = async () => {
    const headers = {
      Accept: 'application/json',
    };
    const sentData = new FormData();
    sentData.append('requestID', navigation.state.params.requestID);

    try {
      const {data: receivedData = null} = await api.post(
        'user/get_response_list',
        sentData,
        headers,
      );
      if (
        receivedData &&
        receivedData.status === 200 &&
        receivedData.responselist.length
      ) {
        const {responselist: responseList} = receivedData;
        return responseList;
      }
      return [];
    } catch (err) {
      throw err;
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    getResponses().then((results) => {
      if (results.length === responses.length) {
        ToastAndroid.showWithGravity(
          'No New Responses',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      } else {
        setResponses(results);
      }
      setRefreshing(false);
    });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshing, responses]);

  useLayoutEffect(() => {
    const subscription = navigation.addListener('didFocus', () => {
      getResponses().then((results) => {
        setResponses(results);
      });
    });

    return () => subscription;
  });

  const createData = () => {
    try {
      const data = new FormData();
      data.append('posterID', user.userID);
      data.append('requestID', requestID);
      data.append('response_content', message);
      data.append('post_time', formatPresentDate());
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const sendData = async () => {
    setLoading(!loading);
    const headers = {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
    };

    const data = await createData();

    try {
      await api.post('/user/send_response', data, headers);
      setLoading(false);
      setIsVisible(false);
      getResponses().then((results) => {
        setResponses(results);
      });
    } catch (err) {
      console.log('err => ', err);
      throw err;
    }
  };

  return (
    <ImageBackground source={bg} style={styles.container} resizeMode="cover">
      <StatusBar barStyle="light-content" backgroundColor="white" />
      <View style={{marginTop: useHeaderHeight() + useHeaderHeight() / 8}}>
        <View
          style={{
            borderTopWidth: 0.8,
            borderBottomWidth: 0.8,
            marginHorizontal: (Dimensions.get('window').width * 0.2) / 4,
            paddingVertical: '2%',
          }}>
          <Button
            title="Reply"
            titleStyle={{color: colors.lightGrey}}
            buttonStyle={styles.button}
            onPress={() => setIsVisible(!isVisible)}
          />
        </View>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {!responses.length ? (
            <Loader customStyles={{marginVertical: 10}} />
          ) : (
            responses.map((chat, key) => (
              <Chat
                key={key}
                message={chat.response_content}
                user={chat.posterID === user.userID ? 'You' : 'Agency'}
                date={convertByTimeZone(chat.post_time)}
              />
            ))
          )}
        </ScrollView>
      </View>
      <Overlay
        isVisible={isVisible}
        windowBackgroundColor="rgba(255, 255, 255, .5)"
        overlayBackgroundColor={colors.snowWhite}
        width="90%"
        height="auto"
        onBackdropPress={() => setIsVisible(!isVisible)}>
        <View style={styles.card}>
          <Input
            inputContainerStyle={styles.input}
            inputStyle={{
              fontSize: 18,
              color: colors.lightGrey,
              textAlignVertical: 'top',
            }}
            placeholder="Type your message here"
            placeholderTextColor={colors.opacityWhite}
            multiline={true}
            numberOfLines={3}
            onChangeText={(text) => setMessage(text)}
          />
          <View
            style={{
              marginHorizontal: (Dimensions.get('window').width * 0.2) / 4,
              paddingVertical: '2%',
              flexDirection: 'row',
              alignSelf: 'flex-end',
            }}>
            <Button
              loading={loading}
              title="Reply"
              titleStyle={{color: colors.lightGrey}}
              buttonStyle={styles.button}
              onPress={() => sendData()}
            />
          </View>
        </View>
      </Overlay>
    </ImageBackground>
  );
};

export default Response;
