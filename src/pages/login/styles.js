import { Dimensions, StyleSheet, TextBase } from 'react-native';
import { themes } from '../../global/themes';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  boxtop: {
    height: Dimensions.get('window').height / 4,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxmid: {
    height: Dimensions.get('window').height / 5.5,
    width: '100%',
    paddingHorizontal: 37,
    marginTop: 30,
  },
  boxbottom: {
    height: Dimensions.get('window').height / 3,
    width: '100%',
    paddingHorizontal: 60,
    marginTop: 12,
  },
  logo: {
    width: 220,
    height: 220,
  },
  titleBold: {
    textAlign: 'center',
    fontFamily: 'Montserrat_700Bold',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: -40,
    color: themes.colors.white,
  },
  title: {
    textAlign: 'center',
    fontFamily: 'Montserrat_400Regular',
    fontSize: 14,
    marginTop: 5,
    color: themes.colors.white,
  },
  labelInput: {
    fontFamily: 'Montserrat_400Regular',
    color: themes.colors.gray,
    marginLeft: 12,
    marginTop: 10,
  },
  boxInput: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderRadius: 30,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: themes.colors.black,
    borderColor: themes.colors.black,
    shadowColor: "#000",
    shadowOffset: {
	    width: 0,
	    height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  input: {
    height: '100%',
    width: '100%',
    borderRadius: 40,
    fontFamily: 'Montserrat_400Regular',
    color: themes.colors.white,
    
  },
  button: {
    width: '100%',
    height: 40,
    borderRadius: 30,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themes.colors.secondary,
    shadowColor: "#000",
    shadowOffset: {
	    width: 0,
	    height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  buttonText: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: 14,
    color: themes.colors.white,
  },
  textBottom: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: 14,
    color: themes.colors.white,
    textAlign: 'center',
    marginTop: 10,
  },
  textBottomBold: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: 14,
    color: themes.colors.white,
    textAlign: 'center',
    marginTop: 10,
  }
});