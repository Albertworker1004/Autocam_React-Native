import {StyleSheet, Dimensions} from 'react-native';
import colors from '~/styles/index';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: (Dimensions.get('window').width * 0.1) / 4,
    paddingVertical: '5%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row: {},
  title: {
    alignSelf: 'baseline',
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.lightGrey,
    marginHorizontal: 10,
  },
  button: {
    marginBottom: '5%',
  },
  halfBox: {
    flex: 1,
  },
  inputContainerStyle: {
    borderBottomWidth: 0.3,
    borderWidth: 0.3,
    borderColor: colors.lightestGrey,
    marginBottom: (Dimensions.get('window').height * 0.1) / 6,
  },
});

export default styles;
