import React, {useState, useEffect} from 'react';
import {View, KeyboardAvoidingView, Platform , Text, TouchableOpacity, TextInput} from 'react-native';
import css from '../../css/main'
import AsyncStorage from '@react-native-community/async-storage';
import Menu from '../../assets/componentes/menu'

export default function Profile({navigation}){
    
    const [ idUser, setIdUser]= useState(null)
    const [ senhaAntiga, setSenhaAntiga]= useState(null)
    const [ novaSenha, setNovaSenha]= useState(null)
    const [ confNovaSenha , setConfNovaSenha]= useState(null)
    const [ msg , setMsg]= useState(null)


    useEffect(()=>{
        async function getIdUser(){
            let response = await AsyncStorage.getItem('userData')
            let json = JSON.parse(response);
            setIdUser(json.id);
        }
        getIdUser();
    });

    async function sendForm(){

        let response = await fetch('http://192.168.15.10:8081/verifyPass',{
                method: 'POST',
                body: JSON.stringify({
                    id: idUser,
                    senhaAntiga: senhaAntiga,
                    confNovaSenha: confNovaSenha,
                    novaSenha: novaSenha
                }),
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json'
                }
        });

       let json = await response.json();
       setTimeout(()=>{
        setMsg(json);
       }, 3000)
    }

    return (
        
        <View style={css.container2}>
            <Menu 
            title="Perfil"
            navigation={navigation}
            />
            <KeyboardAvoidingView style={css.ContGeral} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View  >
                <Text style={{color: 'red', alignSelf:'center', marginTop:20}}>{msg}</Text>
                <Text style={css.AlSenha}>Alterar Senha</Text>
                <TextInput style={css.inputSenha} placeholder='Senha Antiga' onChangeText={text=>setSenhaAntiga(text)} ></TextInput>
                <TextInput style={css.inputSenha1} placeholder='Nova Senha' onChangeText={text=>setNovaSenha(text)} ></TextInput>
                <TextInput style={css.inputSenha2} placeholder='Confirmar Nova Senha' onChangeText={text=>setConfNovaSenha(text)} ></TextInput>

                <TouchableOpacity onPress={()=>sendForm()}>

                    <Text style={css.geralSenha}>Trocar</Text>

                </TouchableOpacity>
           
            </View>
            </KeyboardAvoidingView>
        </View>
      
    )
}