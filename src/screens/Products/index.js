import React, {useContext, useEffect, useState, useCallback} from 'react';
import {NavigationContext} from 'react-navigation';
import {
  ImageBackground,
  StatusBar,
  View,
  ScrollView,
  Dimensions,
  ToastAndroid,
  RefreshControl,
  Alert,
} from 'react-native';
import {useHeaderHeight} from 'react-navigation-stack';
import {connect} from 'react-redux';
import styles from './styles';
import Button from '~/components/Button';
import bg from '~/assets/background-white/whiteBg.png';

import Loader from '~/components/Loader';
import ListByCategory from '~/components/ListProducts/ListByCategory';
import api from '~/server/index';
import {Context as UserContext} from '~/Store/index';

const Products = ({
  orderedProducts: orderedProductsInGlobalStore,
  updateOrderedProducts: updateGlobalStore,
}) => {
  //contexts
  const navigation = useContext(NavigationContext);
  const {user} = useContext(UserContext);

  //States
  const [loading, setLoading] = useState(false);
  const [reorderedItems, setReorderedItems] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getProducts = async () => {
    const headers = {
      Accept: 'application/json',
    };
    const sentData = new FormData();
    sentData.append('userID', user.userID);
    try {
      const {data: receivedData = null} = await api.post(
        'user/get_product_list',
        sentData,
        headers,
      );
      if (
        receivedData &&
        receivedData.status === 200 &&
        receivedData.productslist.length
      ) {
        const {productslist: productList} = receivedData;
        return productList;
      }
      return [];
    } catch (err) {
      throw err;
    }
  };

  const getCategories = async () => {
    const headers = {
      Accept: 'application/json',
    };
    const sentData = new FormData();
    sentData.append('userID', user.userID);
    try {
      const {data: receivedData = null} = await api.post(
        'user/get_category_list',
        sentData,
        headers,
      );
      if (
        receivedData &&
        receivedData.status === 200 &&
        receivedData.categorylist.length
      ) {
        const {categorylist: categoryList} = receivedData;
        return categoryList;
      }
      return [];
    } catch (err) {
      throw err;
    }
  };

  const getCategoryProducts = async () => {
    const reorderedArray = [];
    const products = await getProducts();
    const categories = await getCategories();
    for (let index = 0; index < categories.length; index++) {
      const {categoryID, category_name: categoryName} = categories[index];
      const reorderedItem = {};
      reorderedItem.categoryID = categoryID;
      reorderedItem.categoryName = categoryName;
      reorderedItem.products = products.filter(
        (item) => item.categoryID === categoryID,
      );
      if (!reorderedItem.products.length) {
        continue;
      }
      reorderedArray.push(reorderedItem);
    }
    return reorderedArray;
  };

  useEffect(() => {
    setLoading(true);
    getCategoryProducts().then((result) => {
      setReorderedItems(result);
      setLoading(false);
    });
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    getCategoryProducts().then((result) => {
      if (result.length === reorderedItems.length) {
        ToastAndroid.showWithGravity(
          'No New Products',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      } else {
        setReorderedItems(result);
      }
      setRefreshing(false);
    });
  }, [refreshing, reorderedItems]);
  return (
    <ImageBackground source={bg} style={styles.container} resizeMode="cover">
      <StatusBar barStyle="light-content" backgroundColor="white" />
      <View
        style={{
          flex: 1,
          marginTop: useHeaderHeight(),
        }}>
        <ScrollView
          style={{
            height: '70%',
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {loading ? (
            <Loader />
          ) : (
            reorderedItems.map(({categoryName, products}, key) => (
              <ListByCategory
                category={categoryName}
                products={products}
                key={key}
                customStyle={
                  key !== 0
                    ? {
                        paddingTop:
                          Dimensions.get('window').height < 700 ? '5%' : '7%',
                      }
                    : {}
                }
              />
            ))
          )}
        </ScrollView>
      </View>

      <View style={styles.button}>
        {!loading && (
          <View style={{marginVertical: '5%'}}>
            <Button
              title="Calculate Shipping"
              onPress={() => {
                if (!Object.keys(orderedProductsInGlobalStore).length) {
                  return Alert.alert(
                    'Message',
                    'You need to order at least a product',
                  );
                }
                navigation.navigate('MyOrder');
              }}
            />
          </View>
        )}
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
    updateOrderedProducts: (products) => dispatch({type: 'UPDATE', products}),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);
