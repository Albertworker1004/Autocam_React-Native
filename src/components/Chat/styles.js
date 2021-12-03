import {StyleSheet, Dimensions} from 'react-native';
import colors from '~/styles';

const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    paddingVertical: '1%',
    marginHorizontal: '5%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    borderWidth: 1,
    backgroundColor: colors.snowWhite,
  },
  card: {
    borderBottomWidth: 0.2,
    paddingVertical: '4%',
  },
  title: {
    fontSize: 17,
    color: colors.lightGrey,
  },
});

export default styles;
