import React, {useContext} from 'react';
import {ImageBackground, StatusBar, View, Text} from 'react-native';
import {Icon} from 'react-native-elements';
import {NavigationContext} from 'react-navigation';
import {useHeaderHeight} from 'react-navigation-stack';
import {connect} from 'react-redux';
import colors from '~/styles';
import styles from './styles';
import bg from '~/assets/background-white/whiteBg.png';
import {ScrollView, TouchableHighlight} from 'react-native-gesture-handler';
import Button from '~/components/Button';

const MyOrder = ({
  orderedProducts,
  updateOrderedProducts: updateGlobalStore,
}) => {
  const navigation = useContext(NavigationContext);
  const orderedProductsKeys = Object.keys(orderedProducts);

  let subTotal = 0;
  const productList = [];

  for (let index = 0; index < orderedProductsKeys.length; index++) {
    const key = orderedProductsKeys[index];
    const price = orderedProducts[key].units * orderedProducts[key].price;
    productList.push(
      <View style={styles.productListView} key={key}>
        <View style={styles.productListTitleView}>
          <Text style={styles.title}>{orderedProducts[key].name}</Text>
        </View>
        <View style={styles.productListNonTitleView}>
          <Text style={styles.amount}>{orderedProducts[key].units}x</Text>
          <Text style={styles.price}>${price}.00</Text>
          <View style={styles.deleteIcon}>
            <TouchableHighlight
              onPress={() => {
                updateGlobalStore({}, key, 'REMOVE');
              }}>
              <Icon name="delete" color={colors.grey} size={20} />
            </TouchableHighlight>
          </View>
        </View>
      </View>,
    );
    subTotal += price;
  }

  return (
    <ImageBackground source={bg} style={styles.container} resizeMode="cover">
      <StatusBar barStyle="light-content" backgroundColor="white" />
      <View
        style={[
          styles.secondaryContainer,
          {
            marginTop: useHeaderHeight(),
          },
        ]}>
        <ScrollView style={styles.productList}>{productList}</ScrollView>
        <View style={styles.productTotal}>
          <View style={styles.topLine} />
          <View style={styles.list}>
            <View style={{paddingBottom: '5%'}}>
              <Text style={styles.subtitle}>Subtotal</Text>
              <Text style={styles.subtitle}>Delivery Cost</Text>
            </View>
            <View style={{paddingBottom: '5%'}}>
              <Text style={{color: colors.lightGrey}}>${subTotal}.00</Text>
              <Text style={{textAlign: 'right', color: colors.lightGrey}}>
                Free
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.button}>
        <View style={{marginVertical: 0}}>
          <Button
            title="Check Out"
            onPress={() =>
              navigation.navigate('CheckOut', {
                subTotal,
              })
            }
          />
        </View>
      </View>
    </ImageBackground>
  );
};

function mapStateToProps(state) {
  return {
    orderedProducts: state.orderedProducts,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateOrderedProducts: (product, productID, type) =>
      dispatch({type, product, productID}),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(MyOrder);
