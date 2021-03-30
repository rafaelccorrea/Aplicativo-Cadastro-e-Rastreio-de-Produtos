import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import {View, Text, Image,Button, Platform ,KeyboardAvoidingView } from 'react-native';
import { TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import Menu from '../../assets/componentes/menu'
import css from '../../css/main'

export default function Cadastro({navigation}){
   
     const address ='Rua Wanderley Rodrigues Pereira';
     const [code, setCode] = useState(null);
     const [user, setUser] = useState(null);
     const [product, setProduct] = useState(null);
     const [response, setResponse] = useState(null);
    

    //Envio do formulario

    async function sendForm(){
        let response = await fetch('http://192.168.15.10:8081/create', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              userId: user,
              code: code,
              product: product,
              local: address
            })
        });

        let json = await response.json();
        setResponse(json);
    }


     useEffect(()=>{
        getUser();
     },[])

     useEffect(()=>{
        randomCode();
        setProduct(null);
     },[response])

     //Chamado o codigo de rastreio
     async function getUser(){
         let response = await AsyncStorage.getItem('userData')
         let json = JSON.parse(response);
         setUser(json.id)
     };

     //Gerar um codigo de rastreio Random code.
     async function randomCode() {
         let result = '';
         let length = 20;
         let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

         for (let i = length; i > 0; --i)
            result += chars[Math.floor(Math.random() * chars.length)];

            setCode(result);
        }        

    return(
        
        <View >
            <Menu 
            title="Cadastro"
            navigation={navigation}
            />
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
            {
        
            <View style={css.qrcode}>
                <Image
                    source={{uri:response, height:180, width:180}}
                />
            </View>

            }
        
            <View style={css.LoginInput}>
                    <TextInput 
                    placeholder="Nome do produto"
                    onChangeText={text=>setProduct(text)}
                    value={product}
                    />
            </View>
            <View>

                <TouchableOpacity style={css.loginBtn} onPress={()=>sendForm()}>
                       <Text>Cadastrar</Text>
                    </TouchableOpacity>
                
            </View>
            </KeyboardAvoidingView>
        </View>
    )
}