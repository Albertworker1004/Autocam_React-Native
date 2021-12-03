import {StyleSheet, Dimensions} from 'react-native';
import colors from '~/styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    paddingHorizontal: (Dimensions.get('window').width * 0.1) / 4,
  },
  button: {
    paddingTop: '4%',
  },
  listContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: '4%',
    borderBottomWidth: 0.8,
  },
  list: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  plusButtonView: {
    flexDirection: 'column',
    flex: 0.2,
  },
  plusButtonLink: {
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    marginVertical: '2%',
    width: '20%',
    height: '80%',
  },
  plusButton: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },
  inputLine: {
    borderTopWidth: 0.8,
    marginHorizontal: (Dimensions.get('window').width * 0.2) / 4,
  },
  formLabel: {
    fontSize: 20,
    color: colors.lightGrey,
    width: '90%',
  },
  scrollViewContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
});

export default styles;
