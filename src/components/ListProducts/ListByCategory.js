import React from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import styles from './styles';
import ListProducts from './index';

const ListByCategory = ({
  category,
  products,
  customStyle,
  orderedProducts: orderedProductsInGlobalStore,
}) => {
  return (
    <View style={[customStyle]}>
      <Text style={styles.category}>{category.toUpperCase()}</Text>
      {products.map((item, key) => (
        <ListProducts
          key={key}
          amount={
            orderedProductsInGlobalStore[item.productID]
              ? orderedProductsInGlobalStore[item.productID].units
              : 0
          }
          avatar={item.product_photo_url}
          name={item.product_name}
          price={item.product_price}
          productID={item.productID}
        />
      ))}
    </View>
  );
};

function mapStateToProps(state) {
  return {
    orderedProducts: state.orderedProducts,
  };
}


export default connect(mapStateToProps)(ListByCategory);
