import React, {useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Alert,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import styles from './styles';
import axios from 'axios';
import {WebView} from 'react-native-webview';
import Loading from '~/components/Loader';
import bg from '~/assets/background-white/whiteBg.png';
import config from '~/appConfig';
import {getQueryParams} from '~/utils';
import ButtonComponent from '~/components/Button';
import backButton from '~/assets/backButton/backButton.png';

import colors from '~/styles';

const Paypal = ({price, closeView, currency}) => {
  const [loading, setLoading] = useState(false);
  const [approvalUrl, setApprovalUrl] = useState(null);
  const [token, setToken] = useState(null);
  const [paymentId, setPaymentId] = useState(null);
  const [confirmingPayment, setConfirmingPayment] = useState(false);

  const pressCheckout = async () => {
    setLoading(true);
    try {
      let response1 = await axios({
        method: 'POST',
        url:
          'https://api.sandbox.paypal.com/v1/oauth2/token?grant_type=client_credentials',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: config.paypalAuth,
        },
      });
      console.log({
        reponse1: response1.data,
      });
      setToken(response1.data.access_token);
      const {access_token: accessToken} = response1.data;
      try {
        let response2 = await axios({
          method: 'POST',
          url: 'https://api.sandbox.paypal.com/v1/payments/payment',
          data: {
            intent: 'sale',
            payer: {
              payment_method: 'paypal',
            },
            transactions: [
              {
                amount: {
                  total: price,
                  currency: currency,
                  details: {
                    subtotal: price,
                    tax: '0',
                    shipping: '0',
                    handling_fee: '0',
                    shipping_discount: '0',
                    insurance: '0',
                  },
                },
              },
            ],
            redirect_urls: {
              return_url: 'https://example.com/return',
              cancel_url: 'https://example.com/cancel',
            },
          },
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log({
          response2: response2.data,
        });
        const {links} = response2.data;
        let approvalLink = links.find((data) => data.rel == 'approval_url');
        console.log('approvalUrl----->', approvalLink);
        setPaymentId(paymentId);
        setApprovalUrl(approvalLink.href);
      } catch (err) {
        console.log('Second Response: Payment-Error::', err);
      }
    } catch (err) {
      console.log('First Response: Payment-Error::', {
        err,
        artefacts: config.paypalAuth,
      });
      setLoading(false);
    }
  };

  const _onNavigationStateChange = async (webViewState) => {
    setLoading(false);
    if (webViewState.url.includes('https://example.com')) {
      setApprovalUrl(null);
      setConfirmingPayment(true);
    }

    const paymentID = getQueryParams('paymentId', webViewState.url);
    const payerID = getQueryParams('PayerID', webViewState.url);

    if (payerID && token) {
      try {
        await axios({
          method: 'POST',
          url: `https://api.sandbox.paypal.com/v1/payments/payment/${paymentID}/execute`,
          data: {
            payer_id: payerID,
          },
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        setToken(null);
        setConfirmingPayment(true);
        Alert.alert('Success', 'Payment has Been Successfully Received');

        closeView(true);
      } catch (err) {
        console.log('Execute-Payment-Error----->', {
          artefacts: {payerID, token},
        });
      }
    }
  };

  return (
    <ImageBackground source={bg} style={styles.container} resizeMode="cover">
      <StatusBar barStyle="light-content" backgroundColor={colors.white} />
      <View
        style={{
          flexDirection: 'row',
          paddingLeft: 15,
          paddingTop: 10,
        }}>
        <View style={{flex: 0.3}}>
          <TouchableOpacity
            onPress={() => {
              closeView();
            }}>
            <Image source={backButton} />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            color: colors.lightGrey,
            fontSize: 26,
            fontWeight: 'bold',
            flex: 1,
            marginBottom: 20,
            paddingLeft: '6%',
          }}>
          Pay With PayPal
        </Text>
      </View>
      {loading && (
        <Loading
          customStyles={{
            marginBottom: 10,
          }}
          message="Redirecting You To Paypal...."
        />
      )}
      {approvalUrl ? (
        <WebView
          source={{uri: approvalUrl}}
          style={{flex: 1}}
          onNavigationStateChange={_onNavigationStateChange}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
        />
      ) : (
        <View style={{flex: 5}}>
          {confirmingPayment ? (
            <Loading message="Confirming Payment...." />
          ) : (
            <View style={{flex: 1}}>
              <View
                style={{
                  flex: 3,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 25,
                    textAlign: 'center',
                    color: '#000',
                    padding: 20,
                  }}>
                  Total:{' '}
                  <Text style={{fontWeight: 'bold'}}>
                    {price} {currency}
                  </Text>
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                }}>
                <ButtonComponent
                  loading={loading}
                  title="Pay Now"
                  onPress={pressCheckout}
                />
              </View>
            </View>
          )}
        </View>
      )}
    </ImageBackground>
  );
};

export default Paypal;
