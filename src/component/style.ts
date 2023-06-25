import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    marginHorizontal: 8,
    marginVertical:4,
    borderColor: '#FF8551',
    borderWidth: 1,
    borderRadius: 12,
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },

  image: {
    width: '100%',
    height: '100%',
  },

  title: {
    color: '#374259',
    fontSize: 16,
    fontWeight: '600',
  },
  price: {
    marginVertical: 8,
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
  },

  sideBar: {
    width: 30,
    backgroundColor: '#FAF0E4',
    borderBottomRightRadius: 12,
    borderTopRightRadius: 12,
    justifyContent: 'center',
  },
});
