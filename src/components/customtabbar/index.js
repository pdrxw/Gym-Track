import React, { useContext } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import style from './styles'; 
import { themes } from '../../global/themes';
import { AuthContextList } from '../../context/authContext_list';

import { AntDesign, Ionicons, Entypo, MaterialIcons } from '@expo/vector-icons';

export default({state, navigation})=>{

    const {onOpen} = useContext(AuthContextList);
    const go = (screenName)=>{
        navigation.navigate(screenName);
    }

    return(
        <View style={style.tabArea}>
            <TouchableOpacity style={style.tabItem} onPress={()=>go("Home")}>
                <Ionicons name="menu" style={{opacity:state.index === 0 ? 1 : 0.2, color: themes.colors.white, fontSize: 32}}/>
            </TouchableOpacity>
            <TouchableOpacity style={style.tabItemButton} onPress={()=>onOpen()}>
                <View style={{width: '100%', left: 10, top: 4}}>
                    <Entypo name="plus" size={32} color={themes.colors.white} />
                </View>
                <View style={{flexDirection: 'row-reverse', width: '100%', right: 10, bottom: 10}}>
                    <MaterialIcons name="edit" size={32} color={themes.colors.white} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={style.tabItem} onPress={()=>go("User")}>
            <Ionicons name="people-sharp" style={{opacity:state.index === 1 ? 1 : 0.2, color: themes.colors.white, fontSize:32}}/>
            </TouchableOpacity>
        </View>
    )
}