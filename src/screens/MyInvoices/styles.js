import {StyleSheet, Dimensions} from 'react-native';
import colors from '~/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: (Dimensions.get('window').width * 0.1) / 4,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  button: {
    paddingBottom: '10%',
  },
  scrollview: {
    maxHeight: '80%',
  },
  list: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomWidth: 0.8,
    marginHorizontal: (Dimensions.get('window').width * 0.2) / 4,
  },
  instructionsContainer: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    paddingLeft: 0,
    margin: 0,
  },
});

export default styles;
