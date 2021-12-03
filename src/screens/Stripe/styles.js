import {StyleSheet, Platform} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 40 : 20,
    paddingBottom: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#cfcfcf',
  },
  backToApp: {
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 20 : 10,
    paddingBottom: 5,
    backgroundColor: 'royalblue',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#fff',
    marginHorizontal: 50,
    marginVertical: 20,
  },
  containerBody: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: 'center',
    marginVertical: 0,
    backgroundColor: 'black',
  },
});
