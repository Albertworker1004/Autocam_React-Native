import React from 'react';
import {Image, TouchableOpacity} from 'react-native';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator, DrawerActions} from 'react-navigation-drawer';

import {Dimensions} from 'react-native';

import colors from './styles';

import Login from '~/screens/Login';
import ForgotPassword from '~/screens/ForgotPassword';
import ChangePassword from '~/screens/ChangePassword';
import ConfirmCode from '~/screens/ConfirmCode';
import Signup from '~/screens/Signup';
import CreateAccount from '~/screens/CreateAccount';
import Products from '~/screens/Products';
import MyOrder from '~/screens/MyOrder';
import CheckOut from '~/screens/CheckOut';
import Rma from '~/screens/Rma';
import Progress from '~/screens/Progress';
import ReportFaulty from '~/screens/ReportFaulty';
import AuthEnterEmail from '~/screens/AuthEnterEmail';
import AuthConfirmCode from '~/screens/AuthConfirmCode';
import AuthChangePassword from '~/screens/AuthChangePassword';
import Account from '~/screens/Account';
import Material from '~/screens/Material';
import Brochure from '~/screens/Brochure';
import UserGuide from '~/screens/UserGuide';
import Billing from '~/screens/Billing';
import Requests from '~/screens/Requests';
import MyInvoices from '~/screens/MyInvoices';
import MyServices from '~/screens/MyServices';
import Response from '~/screens/Response';
import CreateRequest from '~screens/CreateRequest';

import backButton from '~/assets/backButton/backButton.png';
import menuButton from '~/assets/menu/hamburger.png';

import CustomSideMenu from '~/components/CustomSideMenu';

const noAuthRoutes = createStackNavigator(
  {
    Login: {
      screen: Login,
    },
    ForgotPassword: {
      screen: ForgotPassword,
      navigationOptions: ({navigation}) => ({
        title: 'Forgot Password',
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={backButton} />
          </TouchableOpacity>
        ),
      }),
    },
    ChangePassword: {
      screen: ChangePassword,
      navigationOptions: ({navigation}) => ({
        title: 'Change Password',
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={backButton} />
          </TouchableOpacity>
        ),
      }),
    },
    ConfirmCode: {
      screen: ConfirmCode,
      navigationOptions: ({navigation}) => ({
        title: 'Confirm Code',
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={backButton} />
          </TouchableOpacity>
        ),
      }),
    },
    Signup,
    CreateAccount: {
      screen: CreateAccount,
      navigationOptions: ({navigation}) => ({
        title: 'Create Account',
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={backButton} />
          </TouchableOpacity>
        ),
      }),
    },
  },
  {
    initialRouteNameL: Login,
    defaultNavigationOptions: {
      headerTitleAlign: 'center',
      headerTransparent: true,
      headerTintColor: 'transparent',
      headerLeftContainerStyle: {
        paddingLeft: '50%',
      },
      headerTitleStyle: {
        color: colors.lightGrey,
        fontSize: 26,
        fontWeight: 'bold',
      },
      animationEnabled: false,
    },
  },
);

const AuthRoutes = createStackNavigator(
  {
    Products: {
      screen: Products,
      navigationOptions: ({navigation}) => ({
        title: 'Products',
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Image source={menuButton} />
          </TouchableOpacity>
        ),
      }),
    },
    MyOrder: {
      screen: MyOrder,
      navigationOptions: ({navigation}) => ({
        title: 'My Order',
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={backButton} />
          </TouchableOpacity>
        ),
      }),
    },
    CheckOut: {
      screen: CheckOut,
      navigationOptions: ({navigation}) => ({
        title: 'Check Out',
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={backButton} />
          </TouchableOpacity>
        ),
      }),
    },
    Rma: {
      screen: Rma,
      navigationOptions: ({navigation}) => ({
        title: 'RMA',
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Image source={menuButton} />
          </TouchableOpacity>
        ),
      }),
    },
    Progress: {
      screen: Progress,
      navigationOptions: ({navigation}) => ({
        title: 'Progress',
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={backButton} />
          </TouchableOpacity>
        ),
      }),
    },
    CreateRequest: {
      screen: CreateRequest,
      navigationOptions: ({navigation}) => ({
        title: 'Create Request',
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={backButton} />
          </TouchableOpacity>
        ),
      }),
    },
    ReportFaulty: {
      screen: ReportFaulty,
      navigationOptions: ({navigation}) => ({
        title: 'Report Faulty',
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={backButton} />
          </TouchableOpacity>
        ),
      }),
    },
    Account: {
      screen: Account,
      navigationOptions: ({navigation}) => ({
        title: 'Account',
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image source={menuButton} />
          </TouchableOpacity>
        ),
      }),
    },
    AuthEnterEmail: {
      screen: AuthEnterEmail,
      navigationOptions: ({navigation}) => ({
        title: 'Enter Email',
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={backButton} />
          </TouchableOpacity>
        ),
      }),
    },
    AuthConfirmCode: {
      screen: AuthConfirmCode,
      navigationOptions: ({navigation}) => ({
        title: 'Confirm Code',
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={backButton} />
          </TouchableOpacity>
        ),
      }),
    },
    AuthChangePassword: {
      screen: AuthChangePassword,
      navigationOptions: ({navigation}) => ({
        title: 'Change Password',
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={backButton} />
          </TouchableOpacity>
        ),
      }),
    },
    Material: {
      screen: Material,
      navigationOptions: ({navigation}) => ({
        title: 'Material',
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image source={menuButton} />
          </TouchableOpacity>
        ),
      }),
    },
    Brochure: {
      screen: Brochure,
      navigationOptions: ({navigation}) => ({
        title: 'Brochure',
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={backButton} />
          </TouchableOpacity>
        ),
      }),
    },
    UserGuide: {
      screen: UserGuide,
      navigationOptions: ({navigation}) => ({
        title: 'User Guide',
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={backButton} />
          </TouchableOpacity>
        ),
      }),
    },
    Billing: {
      screen: Billing,
      navigationOptions: ({navigation}) => ({
        title: 'Billing',
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image source={menuButton} />
          </TouchableOpacity>
        ),
      }),
    },
    Requests: {
      screen: Requests,
      navigationOptions: ({navigation}) => ({
        title: 'Requests',
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image source={menuButton} />
          </TouchableOpacity>
        ),
      }),
    },
    MyInvoices: {
      screen: MyInvoices,
      navigationOptions: ({navigation}) => ({
        title: 'My Invoices',
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={backButton} />
          </TouchableOpacity>
        ),
      }),
    },
    MyServices: {
      screen: MyServices,
      navigationOptions: ({navigation}) => ({
        title: 'My Services',
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={backButton} />
          </TouchableOpacity>
        ),
      }),
    },
    Response: {
      screen: Response,
      navigationOptions: ({navigation}) => ({
        title: 'Response',
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={backButton} />
          </TouchableOpacity>
        ),
      }),
    },
  },
  {
    defaultNavigationOptions: {
      headerTitleAlign: 'center',
      headerTransparent: true,
      headerTintColor: 'transparent',
      headerLeftContainerStyle: {
        paddingLeft: '50%',
      },
      headerTitleStyle: {
        color: colors.lightGrey,
        fontSize: 26,
        fontWeight: 'bold',
      },
      animationEnabled: false,
    },
  },
);

const AppDrawerNavigator = createDrawerNavigator(
  {
    AuthRoutes,
  },
  {
    contentComponent: CustomSideMenu,
    drawerWidth: Dimensions.get('window').width * 0.58,
    hideStatusBar: true,
    overlayColor: 1,
    contentOptions: {
      activeTintColor: colors.grey,
    },
  },
);

export default createAppContainer(
  createSwitchNavigator(
    {
      Auth: noAuthRoutes,
      App: AppDrawerNavigator,
    },
    {
      initialRouteName: 'Auth',
    },
  ),
);
