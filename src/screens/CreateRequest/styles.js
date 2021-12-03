import {StyleSheet, Dimensions} from 'react-native';
import colors from '~/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: (Dimensions.get('window').width * 0.1) / 4,
  },
  formView: {
    height: '80%',
  },
  listContainer: {
    marginHorizontal: '5%',
  },
  list: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    paddingVertical: Dimensions.get('window').height < 700 ? '0.5%' : '2%',
    paddingHorizontal: '2%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  showSerial: {
    backgroundColor: colors.darkWhite,
    borderColor: colors.lightestGrey,
    width: '40%',
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderBottomWidth: 2,
    borderRadius: 3,
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 8,
  },
  title: {
    fontSize: 18,
    color: colors.lightGrey,
  },
  card: {},
  button: {},
  topLine: {
    borderTopWidth: 0.8,
    marginHorizontal: (Dimensions.get('window').width * 0.2) / 4,
    marginVertical: '1%',
  },
  inputContainerStyle: {
    backgroundColor: colors.snowWhite,
    borderColor: colors.lightGrey,
    borderWidth: 1,
    margin: 0,
    padding: 0,
  },
  inputStyle: {
    fontSize: 18,
    color: colors.black,
    textAlignVertical: 'top',
  },
});

export default styles;
