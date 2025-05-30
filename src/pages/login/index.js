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

export default function Login() {

  const navigation = useNavigation();
  
  const [email, setEmail] = React.useState('admin@gmail.com');
  const [password, setPassword] = React.useState('admin123');

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  function userLogin() {
    if(email === '' || password === '') {
      alert('Preencha todos os campos!');
      return;
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          navigation.reset({routes: [{name: 'BottomRoutes'}]});
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage);
        });
    }
  }


  return (
    <LinearGradient colors={[themes.colors.black, themes.colors.primary]} style={style.container}>
      <View style={style.boxtop}>
        <Image style={style.logo} source={logo} resizeMode='contain' />
        <Text style={style.titleBold}>Fazer Login</Text>
        <Text style={style.title}>Digite seu e-mail e senha para acessar o aplicativo</Text>
      </View> 
      <View style={style.boxmid}>
        <Text style={style.labelInput}>E-mail</Text>
        <View style={style.boxInput}> 
          <TextInput 
            style={style.input} 
            value={email}
            onChangeText={setEmail}
          />
          <MaterialIcons name="person" size={24} color={themes.colors.gray}/>
        </View>

        <Text style={style.labelInput}>Senha</Text>
        <View style={style.boxInput}> 
          <TextInput 
            style={style.input} 
            value={password} secureTextEntry
            onChangeText={setPassword}
          />
          <MaterialIcons name="remove-red-eye" size={24} color={themes.colors.gray}/>
        </View>
      </View>
      <View style={style.boxbottom}>
        <TouchableOpacity onPress={userLogin} style={style.button}>
          <Text style={style.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
      <Text style={style.textBottom}>Ainda não tem conta? <Text style={style.textBottomBold} onPress={() => navigation.navigate('Register')}>Cadastre-se</Text></Text>
    </LinearGradient>
  );
}