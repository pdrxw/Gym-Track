import { Dimensions, StyleSheet } from 'react-native';
import { themes } from '../../global/themes';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    header: {
        width: '100%',
        height: Dimensions.get('window').height / 5.5,
        backgroundColor: themes.colors.veryblack,
        paddingHorizontal: 30,
        justifyContent: 'center',
        paddingTop: 40,
    },
    greeting: {
        fontSize: 24,
        color: themes.colors.white,
        fontFamily: 'Montserrat_400Regular',
    },
    boldText: {
        fontFamily: 'Montserrat_700Bold',
    },
    boxInput: {
        width: '100%',
        height: 45,
        borderRadius: 25,
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: themes.colors.black,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    input: {
        flex: 1,
        marginLeft: 10,
        fontFamily: 'Montserrat_400Regular',
        color: themes.colors.white,
        fontSize: 16,
    },
    content: {
        flex: 1,
        width: '100%',
    },
    progressContainer: {
        paddingHorizontal: 30,
        marginTop: 25,
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 18,
        color: themes.colors.white,
        fontFamily: 'Montserrat_700Bold',
    },
    progressText: {
        fontSize: 14,
        color: themes.colors.gray,
        marginTop: 5,
        fontFamily: 'Montserrat_400Regular',
    },
    progressBar: {
        height: 8,
        width: '100%',
        backgroundColor: themes.colors.darkgray,
        borderRadius: 4,
        marginTop: 12,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: themes.colors.secondary,
        borderRadius: 4,
    },
    list: {
        width: '100%',
    },
    listContent: {
        paddingHorizontal: 30,
        paddingBottom: 30,
    },
    card: {
        width: '100%',
        backgroundColor: themes.colors.black,
        marginTop: 15,
        borderRadius: 12,
        padding: 18,
        borderWidth: 1,
        borderColor: themes.colors.veryblack,
    },
    completedCard: {
        borderColor: themes.colors.secondary,
    },
    rowCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    rowCardLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        flex: 1,
    },
    ball: {
        width: 12,
        height: 12,
        borderRadius: 6,
    },
    completedBall: {
        backgroundColor: themes.colors.secondary,
    },
    cardTitle: {
        fontSize: 16,
        color: themes.colors.white,
        fontFamily: 'Montserrat_700Bold',
        flexShrink: 1,
    },
    completedText: {
        color: themes.colors.secondary,
        textDecorationLine: 'line-through',
    },
    cardDescription: {
        fontSize: 14,
        color: themes.colors.gray,
        fontFamily: 'Montserrat_400Regular',
        lineHeight: 20,
    },
    flagCard: {
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 10,
    },
    completedFlag: {
        backgroundColor: themes.colors.secondary,
    },
    flagText: {
        color: themes.colors.white,
        fontSize: 12,
        fontFamily: 'Montserrat_700Bold',
    },
    checkIcon: {
        marginLeft: -5,
    },
    modalContainer: {
        padding: 20,
        paddingTop: 40
      },
      modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center'
      },
      modalOption: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
      },
      deleteOption: {
        backgroundColor: '#ffebee'
      },
      deleteText: {
        color: '#d32f2f'
      }
});