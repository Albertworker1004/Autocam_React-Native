import {StyleSheet, Dimensions} from 'react-native';
import colors from '~/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  list: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.8,
    marginHorizontal: (Dimensions.get('window').width * 0.2) / 4,
  },
  button: {
    width: 100,
    padding: 0,
    backgroundColor: colors.darkWhite,
    borderColor: colors.lightestGrey,
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
    fontSize: 20,
    color: colors.lightGrey,
    marginBottom: '1%',
    paddingLeft: '5%',
  },
  values: {
    fontSize: 15,
    fontWeight: '300',
  },

  bottomButton: {
    paddingBottom: '10%',
  },
});

export default styles;
