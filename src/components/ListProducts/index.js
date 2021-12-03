import React, {useContext, useState, useLayoutEffect, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, TextInput} from 'react-native';
import {NavigationContext} from 'react-navigation';
import {connect} from 'react-redux';
import colors from '~/styles';
import styles from './styles';

const ListProducts = ({
  RMA,
  amount,
  avatar,
  name,
  price,
  repairCost,
  productID,
  updateOrderedProducts,
}) => {
  const navigation = useContext(NavigationContext);

  const [unit, setUnit] = useState();

  useEffect(() => {
    setUnit(amount.toString());
  }, [amount]);

  return !RMA ? (
    <View style={styles.containerView}>
      <View style={styles.list}>
        <View style={{flexDirection: 'row', alignItems: 'center', flex: 2}}>
          <View style={{flex: 1}}>
            <View style={styles.productBg}>
              <Image
                source={{
                  uri: avatar,
                }}
                style={styles.productImage}
              />
            </View>
          </View>
          <View style={{paddingLeft: '5%', flex: 1}}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 18,
                color: colors.lightGrey,
              }}>
              {name}
            </Text>
            <Text
              style={{
                color: colors.lightGrey,
              }}>
              ${price} per unit
            </Text>
          </View>
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.unitInput}
            keyboardType="numeric"
            onChangeText={(unitInText) => {
              unitInText = unitInText.trim();
              setUnit(unitInText);
              if (unitInText === '') {
                return;
              }
              if (unitInText === '0') {
                updateOrderedProducts({}, productID, 'REMOVE');
                return;
              }
              const numericUnit = parseInt(unitInText, 10);
              console.log({numericUnit});
              const productObj = {
                units: numericUnit,
                price,
                name,
              };
              updateOrderedProducts(productObj, productID, 'ADD');
            }}
            value={unit}
          />
        </View>
      </View>
    </View>
  ) : (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Progress', {
          name,
          repairCost,
          avatar,
        })
      }>
      <View style={styles.list}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.productBg}>
            <Image source={avatar} style={styles.productImage} />
          </View>
          <View style={{paddingLeft: '5%'}}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 22,
                color: colors.lightGrey,
              }}>
              {name}
            </Text>

            <Text
              style={{
                color: colors.lightGrey,
                fontSize: 13,
              }}>
              Click for progress
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
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

export default connect(mapStateToProps, mapDispatchToProps)(ListProducts);
