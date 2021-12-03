import {StyleSheet, Dimensions} from 'react-native';
import colors from '~/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: (Dimensions.get('window').width * 0.1) / 4,
  },
  button: {
    paddingTop: '4%',
  },
  list: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    paddingVertical: Dimensions.get('window').height < 700 ? '2%' : '4%',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.8,
    marginHorizontal: (Dimensions.get('window').width * 0.2) / 4,
  },
  productBg: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DBDBDB',
    borderColor: colors.darkGrey,
    borderRadius: 75,
    width: 100,
    height: 100,
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 8,
  },
});

export default styles;
