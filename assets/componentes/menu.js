import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import css from '../../css/main'
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';

export default function Menu(props){

    async function logout(){
        await AsyncStorage.clear();
        props.navigation.navigate('Login')
      }

    return(
        <View style={css.area__menu}>
            <TouchableOpacity style={css.button__home2} onPress={() => props.navigation.navigate('Home')} >
                <Icon name="home" size={20} color="#999"/>
            </TouchableOpacity>

            <Text style={css.area__title}>{props.title}</Text>
        
            <TouchableOpacity style={css.logout} onPress={() => props.navigation.navigate('Login')} >
                <Icon name="sign-out" size={20} color="#999"/>
            </TouchableOpacity>
        
        </View>
    )
}