import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../services/firebase.config';
import { doc, getDoc } from 'firebase/firestore';
import style from './styles';
import { themes } from '../../global/themes';
import { useAuthList } from '../../context/authContext_list';

export default function User() {
    const [fontsLoaded] = useFonts({ Montserrat_400Regular, Montserrat_700Bold });
    const [userData, setUserData] = useState(null);
    const navigation = useNavigation();
    const { signOut: contextSignOut } = useAuthList();

    useEffect(() => {
        const fetchUserData = async () => {
            const currentUser = auth.currentUser;
            if (currentUser) {
                const docRef = doc(db, 'users', currentUser.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setUserData({ ...docSnap.data(), photoURL: currentUser.photoURL });
                }
            }
        };
        fetchUserData();
    }, []);

    if (!fontsLoaded || !userData) 
        return(
            <LinearGradient 
                style={style.container} 
                colors={[themes.colors.black, themes.colors.primary]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            />
        );

    const handleLogout = async () => {
        try {
            await signOut(auth);
            contextSignOut();
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    };

    return (
        <LinearGradient style={style.container} colors={[themes.colors.black, themes.colors.primary]}>
            <ScrollView contentContainerStyle={style.scrollContent}>
                {/* Foto de Perfil */}
                <View style={style.avatarContainer}>
                    <Image 
                        source={userData.photoURL ? { uri: userData.photoURL } : require('../../../assets/default-avatar.png')}
                        style={style.avatar}
                    />
                </View>

                {/* Nome do usuário */}
                <Text style={style.title}>{userData.name}</Text>

                {/* Informações */}
                <View style={style.infoBlock}>
                    <Feather name="user" size={24} color={themes.colors.white} style={style.icon} />
                    <TextInput
                        style={style.disabledInput}
                        value={userData.name}
                        editable={false}
                    />
                </View>

                <View style={style.infoBlock}>
                    <Feather name="at-sign" size={24} color={themes.colors.white} style={style.icon} />
                    <TextInput
                        style={style.disabledInput}
                        value={userData.usuario || 'Usuário'}
                        editable={false}
                    />
                </View>

                <View style={style.infoBlock}>
                    <MaterialIcons name="email" size={24} color={themes.colors.white} style={style.icon} />
                    <TextInput
                        style={style.disabledInput}
                        value={userData.email}
                        editable={false}
                    />
                </View>

                <View style={style.infoBlock}>
                    <Ionicons name="calendar-outline" size={24} color={themes.colors.white} style={style.icon} />
                    <TextInput
                        style={style.disabledInput}
                        value={new Date(userData.createdAt?.seconds * 1000).toLocaleDateString()}
                        editable={false}
                    />
                </View>

                {/* Botão de logout */}
                <TouchableOpacity style={style.logoutButton} onPress={handleLogout}>
                    <MaterialIcons name="logout" size={24} color={themes.colors.white} />
                    <Text style={style.logoutButtonText}>Sair da Conta</Text>
                </TouchableOpacity>
            </ScrollView>
        </LinearGradient>
    );
}
