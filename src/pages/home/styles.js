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
        // textDecorationLine: 'line-through',
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
    },
    pointsText: {
        fontSize: 14,
        color: 'red',
        fontFamily: 'Montserrat_400Regular',
        marginTop: 5,
    },
    // Estilos para a seção de produtos parceiros
    partnerSection: {
        marginTop: 20,
        marginBottom: 30,
    },
    productsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    productContainer: {
        width: '48%',
        marginBottom: 15,
    },
    productItem: {
        backgroundColor: themes.colors.black,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: themes.colors.veryblack,
        padding: 10,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    productImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginBottom: 8,
    },
    productName: {
        fontFamily: 'Montserrat_700Bold',
        fontSize: 14,
        color: themes.colors.white,
        textAlign: 'center',
        marginBottom: 4,
    },
    productDescription: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 12,
        color: themes.colors.gray,
        textAlign: 'center',
    },
    productPrice: {
        fontFamily: 'Montserrat_700Bold',
        fontSize: 12,
        color: themes.colors.white,
        marginTop: 4,
        marginLeft: 4,
    },
    buyButton: {
        width: '50%',
        height: 30,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: themes.colors.secondary,
        marginTop: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
    },
    buyButtonText: {
        fontFamily: 'Montserrat_700Bold',
        fontSize: 12,
        color: themes.colors.white,
    },  
    productPriceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
});