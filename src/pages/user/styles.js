import { StyleSheet } from 'react-native';
import { themes } from '../../global/themes';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontFamily: 'Montserrat_700Bold',
        color: themes.colors.white,
        marginBottom: 40,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: themes.colors.exercise,
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 30,
        marginTop: 20,
    },
    logoutButtonText: {
        color: themes.colors.white,
        fontFamily: 'Montserrat_700Bold',
        fontSize: 16,
        marginLeft: 10,
    },
    disabledInput: {
        backgroundColor: themes.colors.veryblack,
        color: themes.colors.gray,
        padding: 12,
        borderRadius: 30,
        fontFamily: 'Montserrat_400Regular',
    },
    infoBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    width: '100%',
    },
    icon: {
    marginRight: 10,
    marginBottom: 12,
    },
    scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: themes.colors.white,
    },
    avatarContainer: {
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 10,
    },
});