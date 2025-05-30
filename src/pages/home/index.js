import React from 'react';
import { Text, Image, TextInput, View, TouchableOpacity, FlatList } from 'react-native';
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

const data = [
    {
        item:0,
        title:'Tomar 4 litros de água.',
        description: 'Teste',
        flag: 'urgente',
    },
    {
        item:1,
        title:'Realizar cardio do dia.',
        description: 'Teste',
        flag: 'urgente',
    },
    {
        item:2,
        title:'Realizar treino do dia.',
        description: 'Teste',
        flag: 'urgente',
    },
    {
        item:3,
        title:'Teste 3.',
        description: 'Teste',
        flag: 'urgente',
    },
]
export default function Home() {

    const _renderCard = (item) => {
        return (
          <TouchableOpacity style={style.card}>
            <View style={style.rowCard}>
              <View style={style.rowCardLeft}>
                <View style={style.ball} />
                <Text style={style.cardTitle}>{item.title}</Text>
              </View>
      
              <View style={style.flagCard}>
                <Text style={style.flagText}>{item.flag}</Text>
              </View>
            </View>
      
            <Text style={style.cardDescription}>{item.description}</Text>
          </TouchableOpacity>
        );
      };
      

    const [fontsLoaded] = useFonts({
        Montserrat_400Regular,
        Montserrat_700Bold,
      });
    
      if (!fontsLoaded) {
        return null;
      }

    return(
        <LinearGradient style = {style.container} colors={[themes.colors.black, themes.colors.primary]}>
                <View style={style.header}>
                    <Text style={style.greeting}>Bom dia, <Text style={{fontWeight: 'bold'}}>Pedro!</Text></Text>
                    <View style={style.boxInput}>
  {/* Mova o MaterialIcons para antes do TextInput */}
  <MaterialIcons name="search" size={24} color={themes.colors.gray} />
  <TextInput 
    style={style.input}
    placeholder="Pesquisar"
    placeholderTextColor={themes.colors.darkgray}
  />
</View>
                </View>
                <View style={style.content}>
                <FlatList
                    data={data}
                    style={{ marginTop: 40, paddingHorizontal: 30 }}
                    keyExtractor={(item) => item.item.toString()}
                    renderItem={({ item }) =>{return(_renderCard(item))}}
                />

                </View>
        </LinearGradient>
    );
}