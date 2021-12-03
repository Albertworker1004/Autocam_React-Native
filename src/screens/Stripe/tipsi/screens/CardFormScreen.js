import React, {PureComponent} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  Image,
} from 'react-native';
import stripe from 'tipsi-stripe';
import testID from '../utils/testID';
import api from '~/server/index';
import config from '~/appConfig';
import colors from '../../../../styles';
import bg from '~/assets/background-white/whiteBg.png';
import backButton from '~/assets/backButton/backButton.png';
import ButtonComponent from '~/components/Button';

stripe.setOptions({
  publishableKey: config.stripeKey,
});

export default class CardFormScreen extends PureComponent {
  static title = 'Card Form';

  state = {
    loading: false,
    token: null,
  };

  handleCardPayPress = async () => {
    try {
      this.setState({loading: true, token: null});
      const token = await stripe.paymentRequestWithCardForm();
      const data = new FormData();
      data.append('amount', this.props.price);
      data.append('currency', this.props.currency);
      data.append('token', token.tokenId);
      data.append('description', this.props.description);
      const headers = {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      };

      console.log('got here');
      const res = await api.post('/user/pay_with_stripe', data, headers);
      console.log(JSON.stringify({data}));
      console.log(res);
      if (res.data.success) {
        Alert.alert('Success', 'Payment was made successfully');
        this.props.closeView(true);
      }
      if (!res.data.success) {
        throw res.data.err;
      }
      this.setState({loading: false, token});
    } catch (error) {
      console.log({error});
      this.setState({loading: false});
    }
  };

  render() {
    const {loading} = this.state;

    return (
      <ImageBackground source={bg} style={styles.container} resizeMode="cover">
        <StatusBar barStyle="light-content" backgroundColor={colors.white} />
        <View
          style={{
            flexDirection: 'row',
            paddingLeft: 15,
            paddingTop: 10,
          }}>
          <View style={{flex: 0.2}}>
            <TouchableOpacity
              onPress={() => {
                this.props.closeView();
              }}>
              <Image source={backButton} />
            </TouchableOpacity>
          </View>
          <Text style={styles.header}>Pay With Credit Card</Text>
        </View>
        <View
          style={{flex: 10, alignItems: 'center', justifyContent: 'center'}}>
          <View
            style={{
              padding: 10,
            }}>
            <Text style={styles.instruction}>
              Click button below to Pay With Credit Card
            </Text>
            <ButtonComponent
              title="Enter you card and pay"
              loading={loading}
              onPress={this.handleCardPayPress}
              {...testID('cardFormButton')}
            />
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    color: colors.lightGrey,
    fontSize: 26,
    fontWeight: 'bold',
    flex: 1,
    paddingLeft: '6%',
  },
  instruction: {
    textAlign: 'center',
    color: '#333333',
    margin: 10,
    marginBottom: 30,
    fontSize: 20,
  },
  token: {
    height: 20,
  },
  backToApp: {
    padding: 10,
    marginHorizontal: 60,
    backgroundColor: colors.darkestGrey,
    borderWidth: 1,
    borderColor: '#fff',
  },
});
