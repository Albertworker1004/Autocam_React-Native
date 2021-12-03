import {StyleSheet, Dimensions} from 'react-native';
import colors from '~/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: (Dimensions.get('window').width * 0.1) / 4,
  },
  secondaryContainer: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 5,
    marginVertical: 20,
  },
  productListView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  productList: {
    flex: 1,
    flexDirection: 'column',
  },
  productListTitleView: {flex: 2},
  productListNonTitleView: {
    flex: 3.5,
    flexDirection: 'row',
  },
  productTotal: {
    flex: 0.2,
    flexDirection: 'column',
  },
  topContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: (Dimensions.get('window').width * 0.2) / 4,
    marginBottom: '10%',
  },
  list: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    marginHorizontal: '1%',
    flex: 0.15,
  },
  productBg: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DBDBDB',
    borderRadius: 75,
    width: 100,
    height: 100,
  },
  productImage: {
    width: 60,
    height: 60,
  },
  image: {
    width: 25,
    height: 25,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.lightGrey,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.lightGrey,
  },
  amount: {
    fontWeight: 'bold',
    paddingHorizontal: 20,
    color: colors.lightGrey,
    flex: 2,
    fontSize: 16,
  },
  price: {
    paddingHorizontal: 5,
    letterSpacing: 0,
    fontSize: 16,
    color: colors.lightGrey,
    flex: 3,
  },
  deleteIcon: {
    flex: 1,
    paddingLeft: 1,
  },
  topLine: {
    borderTopWidth: 0.8,
    marginVertical: '1%',
  },
});

export default styles;
