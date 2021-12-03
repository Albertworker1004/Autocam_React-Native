import {StyleSheet, Dimensions} from 'react-native';
import colors from '~/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: (Dimensions.get('window').width * 0.1) / 4,
    paddingVertical: (Dimensions.get('window').width * 0.1) / 2,
    alignItems: 'center',
  },
  instructionsContainer: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    marginTop: 0,
    paddingHorizontal: (Dimensions.get('window').width * 0.1) / 1.2,
  },
  instructions: {
    fontWeight: '500',
    color: colors.grey,
    fontSize: 12,
  },
  underline: {textDecorationLine: 'underline'},
  bottomInstructions: {
    color: colors.grey,
    fontSize: 14,
    textAlign: 'center',
  },
  bottomView: {
    paddingVertical: (Dimensions.get('window').width * 0.1) / 10,
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default styles;
