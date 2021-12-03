import React, {useContext, useState, useLayoutEffect, useCallback} from 'react';
import {NavigationContext} from 'react-navigation';
import {
  ImageBackground,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  RefreshControl,
  ToastAndroid,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {useHeaderHeight} from 'react-navigation-stack';
import colors from '~/styles';
import styles from './styles';
import api from '~/server/index';
import requestStatus from '~/dataMaps/RequestStatus';
import {Context as UserContext} from '~/Store/index';
import {timeAgo} from '~/utils';
import bg from '~/assets/background-white/whiteBg.png';
import plus from '~/assets/plus-minus/altBigPlus.png';
import Loader from '~/components/Loader';

const Requests = () => {
  // Contexts
  const navigation = useContext(NavigationContext);
  const {user} = useContext(UserContext);

  // States
  const [requests, setRequests] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getRequests = async () => {
    const headers = {
      Accept: 'application/json',
    };
    const sentData = new FormData();
    sentData.append('userID', user.userID);
    try {
      const {data: receivedData = null} = await api.post(
        'user/get_request_list',
        sentData,
        headers,
      );
      if (
        receivedData &&
        receivedData.status === 200 &&
        receivedData.requestlist.length
      ) {
        const {requestlist: requestList} = receivedData;
        return requestList;
      }
      return [];
    } catch (err) {
      throw err;
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    getRequests().then((results) => {
      if (results.length === requests.length) {
        ToastAndroid.showWithGravity(
          'No New Requests',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      } else {
        setRequests(results);
      }
      setRefreshing(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshing, requests]);

  useLayoutEffect(() => {
    const subscription = navigation.addListener('willFocus', () => {
      getRequests().then((results) => {
        setRequests(results);
      });
    });
    return () => subscription;
  },[navigation]);

  return (
    <ImageBackground source={bg} style={[styles.container]} resizeMode="cover">
      <StatusBar barStyle="light-content" backgroundColor="white" />
      <ScrollView
        style={[
          styles.scrollView,
          {marginTop: useHeaderHeight() + useHeaderHeight() / 4},
        ]}
        contentContainerStyle={[styles.scrollViewContainerStyle]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.inputLine} />
        {!requests.length ? (
          <Loader />
        ) : (
          requests.map((request, index) => (
            <TouchableOpacity
              style={styles.listContainer}
              onPress={() =>
                navigation.navigate('Response', {
                  requestID: request.requestID,
                })
              }
              key={index}>
              <View>
                <View style={styles.list}>
                  <Text
                    style={{
                      fontSize: 20,
                      color: colors.lightGrey,
                      width: '90%',
                    }}>
                    #{('000' + request.requestID).slice(-3)}.{' '}
                    {request.request_title}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: '2%',
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      color: colors.lightGrey,
                    }}>
                    {requestStatus[request.request_status]}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: colors.lightGrey,
                    }}>
                    {timeAgo(request.update_time, 'string')}
                  </Text>
                </View>
              </View>
              <Icon
                name="navigate-next"
                type="material"
                color={colors.lightGrey}
                size={55}
              />
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
      <View style={styles.plusButtonView}>
        <TouchableOpacity
          style={styles.plusButtonLink}
          onPress={() => navigation.navigate('CreateRequest')}>
          <Image style={styles.plusButton} source={plus} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Requests;
