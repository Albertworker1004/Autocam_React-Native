import React, {useContext} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {DrawerActions} from 'react-navigation-drawer';

import menu from '~/assets/menu/hamburger.png';
import emptyProfile from '~/assets/emptyProfile/empty-profile.png';
import colors from '~/styles';
import {Context as UserContext} from '~/Store/index';

const items = [
  {
    navOptionName: 'Place Orders',
    screenToNavigate: 'Products',
  },
  {
    navOptionName: 'RMA',
    screenToNavigate: 'Rma',
  },
  {
    navOptionName: 'Billing',
    screenToNavigate: 'Billing',
  },
  {
    navOptionName: 'Requests',
    screenToNavigate: 'Requests',
  },
  {
    navOptionName: 'Account',
    screenToNavigate: 'Account',
  },
  {
    navOptionName: 'Material',
    screenToNavigate: 'Material',
  },
  {
    navOptionName: 'Logout',
    screenToNavigate: 'Login',
  },
];

const styles = StyleSheet.create({
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.darkWhite,
    alignItems: 'center',
    paddingTop: 20,
  },
  sideMenuProfileIcon: {
    width: 150,
    height: 150,
    marginTop: 10,
    borderRadius: 75,
  },
  img: {
    paddingLeft: '5%',
    alignSelf: 'baseline',
  },
});

const CustomSidebarMenu = ({navigation}) => {
  const {user} = useContext(UserContext);
  const getActiveRouteState = function (route) {
    if (
      !route.routes ||
      route.routes.length === 0 ||
      route.index >= route.routes.length
    ) {
      return route;
    }

    const childActiveRoute = route.routes[route.index];
    return getActiveRouteState(childActiveRoute);
  };

  const routeName = getActiveRouteState(navigation.state).routeName;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        backgroundColor: colors.darkWhite,
      }}>
      <View style={styles.sideMenuContainer}>
        <TouchableOpacity
          style={styles.img}
          onPress={() => navigation.closeDrawer()}>
          <Image source={menu} resizeMode="contain" />
        </TouchableOpacity>
        <Image
          source={user.photo_url ? {uri: user.photo_url} : emptyProfile}
          style={styles.sideMenuProfileIcon}
        />
        <Text
          allowFontScaling
          style={{
            color: colors.lightGrey,
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: 18,
            paddingHorizontal: 20,
            paddingVertical: 10,
          }}>
          {user.fullname}
        </Text>
        <View
          style={{
            width: '80%',
            height: 0.5,
            backgroundColor: colors.white,
            marginTop: '20%',
          }}
        />
        {/*Setting up Navigation Options from option array using loop*/}
        <View style={{width: '80%'}}>
          {items.map((item, key) => (
            <TouchableOpacity
              onPress={() =>
                routeName !== item.screenToNavigate
                  ? navigation.navigate(item.screenToNavigate)
                  : navigation.dispatch(DrawerActions.closeDrawer())
              }
              style={{
                flexDirection: 'row',
                borderBottomWidth: 0.5,
                borderColor: colors.white,
                paddingTop: 10,
                paddingBottom: 10,
                backgroundColor: 'transparent',
              }}
              key={key}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: colors.lightGrey,
                }}>
                {item.navOptionName}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default CustomSidebarMenu;
