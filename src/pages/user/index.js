import React from 'react';
import { Text, Image, TextInput, View, TouchableOpacity } from 'react-native';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import style from './styles';
import logo from '../../assets/logo.png';
import { themes } from '../../global/themes';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useState } from 'react';
import { auth } from '../../services/firebase.config';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function User() {
    return(
        <LinearGradient style = {style.container} colors={[themes.colors.black, themes.colors.primary]}>
                <Text>User</Text>
        </LinearGradient>
    );
}