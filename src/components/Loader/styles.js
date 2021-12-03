import {StyleSheet} from 'react-native';
import colors from '~/styles';

const styles = StyleSheet.create({
  view: {width: 'auto', justifyContent: 'center', alignItems: 'center'},
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 0,
    backgroundColor: colors.darkWhite,
    paddingVertical: 10,
    paddingHorizontal: 50,
  },
});

export default styles;
