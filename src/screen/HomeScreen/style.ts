import { StyleSheet } from "react-native";
import { WIDTH } from "../../utils/utils";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  loading: {
    position: 'absolute',
    left: 40,
    right: 40,
    top: 40,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerImage: {
    width: WIDTH,
    height: WIDTH * 0.4,
  },
  categoryContainer: {
    height: 40,
    minWidth: 100,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d1d1',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    marginHorizontal: 4,
    padding: 8,
  },
  text: {
    color: '#545B77',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'justify',
    letterSpacing: 0.5,
  },
  bottomView: {
    width: '28%',
    height: 40,
    backgroundColor: '#EE5407',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    right: 5,
    borderRadius: 30,
    marginBottom: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
  },
});
