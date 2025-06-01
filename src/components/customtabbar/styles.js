import { Dimensions, StyleSheet, TextBase } from 'react-native';
import { themes } from '../../global/themes';

export default StyleSheet.create({
    tabArea: {
        flexDirection: 'row',
        height: 80,
        justifyContent: 'space-around',
        backgroundColor: themes.colors.black,
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        levation: 24,
        
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        color: themes.colors.white
    },
    tabItemButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        height: 70,
        borderRadius: 35,
        zIndex: 9999,
        top: -30,
        backgroundColor: themes.colors.secondary,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
    }
});