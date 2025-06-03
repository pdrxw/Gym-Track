import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { themes } from '../../global/themes';

export default function SplashScreen() {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={themes.colors.secondary} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: themes.colors.black
    }
});