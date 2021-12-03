import {StyleSheet, Dimensions} from 'react-native';
import colors from '~/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: (Dimensions.get('window').width * 0.1) / 4,
    paddingVertical: (Dimensions.get('window').width * 0.1) / 2,
    alignItems: 'center',
  },
  instructions: {
    color: colors.grey,
    fontSize: 14,
    marginTop: 20,
    textAlign: 'center',
  },
  alignRight: {
    marginLeft: Dimensions.get('window').width * 0.5,
  },
  bottomView: {
    paddingVertical: 20,
    flex: 1,
    justifyContent: 'space-between',
  },
  bottomText: {
    paddingBottom: 10,
  },
});

export default styles;
