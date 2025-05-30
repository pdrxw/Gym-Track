import { Dimensions, StyleSheet } from 'react-native';
import { themes } from '../../global/themes';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    height: Dimensions.get('window').height / 6,
    backgroundColor: themes.colors.veryblack,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  greeting: {
    fontSize: 24,
    marginTop: 20,
    color: themes.colors.white,
    fontFamily: 'Montserrat_400Regular',
  },
  boxInput: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderRadius: 30,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
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
  content: {
    flex: 1,
    width: '100%',
  },
  card: {
    width: '100%',
    backgroundColor: themes.colors.white,
    marginTop: 6,
    borderRadius: 10,
    justifyContent: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: themes.colors.gray,
  },
  rowCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10, // Se não funcionar, use marginRight no estilo ball
  },
  ball: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: themes.colors.primary,
  },
  cardTitle: {
    fontSize: 16,
    color: themes.colors.black,
    fontFamily: 'Montserrat_700Bold',
  },
  cardDescription: {
    fontSize: 14,
    color: themes.colors.gray,
    marginTop: 4,
    fontFamily: 'Montserrat_400Regular',
  },
  flagCard: {
    backgroundColor: themes.colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  flagText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Montserrat_700Bold',
  },
});
