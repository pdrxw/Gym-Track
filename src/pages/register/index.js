import React from 'react';
import { Text, Image, TextInput, View, TouchableOpacity } from 'react-native';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import style from './styles';
import logo from '../../assets/logo.png';
import { themes } from '../../global/themes';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebase.config';

export default function Register() {

  const navigation = useNavigation();
  
  const [user, setUser] = React.useState('');
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  function userRegister() {
    if(user === '' || name === '' || email === '' || password === '') {
      alert('Preencha todos os campos!');
      return;
    } else {
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        alert('Cadastro realizado com sucesso!');
        navigation.navigate('Login');
      })
      .catch ((error) => {
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
        <Text style={style.titleBold}>Cadastre-se</Text>
        <Text style={style.title}>Preencha o formulário para se cadastrar</Text>
      </View> 
      <View style={style.boxmid}>
        <Text style={style.labelInput}>Usuário</Text>
        <View style={style.boxInput}> 
          <TextInput 
            style={style.input} 
            value={user}
            onChangeText={setUser}
          />
          <MaterialIcons name="person" size={24} color={themes.colors.gray}/>
        </View>

        <Text style={style.labelInput}>Nome Completo</Text>
        <View style={style.boxInput}> 
          <TextInput 
            style={style.input} 
            value={name}
            onChangeText={setName}
          />
          <MaterialIcons name="drive-file-rename-outline" size={24} color={themes.colors.gray}/>
        </View>

        <Text style={style.labelInput}>E-mail</Text>
        <View style={style.boxInput}> 
          <TextInput 
            style={style.input} 
            autoCapitalize='none'
            autoComplete='email'
            keyboardType='email-address' 
            value={email}
            onChangeText={setEmail}
          />
          <MaterialIcons name='mail' size={24} color={themes.colors.gray}/>
        </View>

        <Text style={style.labelInput}>Senha</Text>
        <View style={style.boxInput}> 
          <TextInput 
            style={style.input} 
            secureTextEntry
            autoCapitalize='none'
            value={password}
            onChangeText={setPassword}
          />
          <MaterialIcons name='remove-red-eye' size={24} color={themes.colors.gray}/>
        </View>
      </View>

      <View style={style.boxbottom}>
        <TouchableOpacity onPress={userRegister} style={style.button}>
          <Text style={style.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
      <Text style={style.textBottom}>Já possui uma conta? <Text style={style.textBottomBold} onPress={() => navigation.navigate('Login')}>Faça login</Text></Text>
    </LinearGradient>
  );
}