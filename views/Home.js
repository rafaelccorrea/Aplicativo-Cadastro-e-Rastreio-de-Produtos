import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native'
import css from '../css/main'

export default function Home({navigation}){
    return(
        <View style={css.contImg}>

            <TouchableOpacity 
                style={css.btnHome}
                onPress={()=> navigation.navigate('Login')}>
                <Image
                    style={css.imgIcons}
                    source={require('../assets/img/login.png')}
                />
            </TouchableOpacity>

            <TouchableOpacity
                onPress={()=> navigation.navigate('Rastreio')}>
                <Image
                    style={css.imgIcons}
                    source={require('../assets/img/entrega.png')}
                />
            </TouchableOpacity>
           
        </View>


    )
}