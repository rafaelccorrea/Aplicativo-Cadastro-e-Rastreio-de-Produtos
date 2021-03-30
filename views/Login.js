import AsyncStorage from '@react-native-community/async-storage';
import React, {useState, useEffect} from 'react';
import {TextInput, TouchableOpacity , Platform, View, Text, KeyboardAvoidingView, Image} from 'react-native'
import css from '../css/main'
import * as LocalAuthentication from 'expo-local-authentication'

export default function Login({navigation}){

    const [display, setDisplay]=useState('none')
    const [Users, setUsers]=useState('null')
    const [password, setPassword]=useState('null')
    const [login, setLogin]=useState('false')
 

    //Cadastrando Digital

    //Usuario possui login?

    useEffect(() =>{
        VerifyLogin();
    }, []);

    useEffect(() =>{
        if(login === true){
            biometric();
        }
    }, [login]);

    async function VerifyLogin(){
        let response = await AsyncStorage.getItem('userData')
        let json = await JSON.parse(response);
        if (json !== null){
            setUsers(json.nome)
            setPassword(json.password)
            setLogin(true);
        }
    }

    //Cadastrando Biometria do Usuario

    async function biometric(){
        let compatible = await LocalAuthentication.hasHardwareAsync();
        if (compatible){
            let biometricRecords = await LocalAuthentication.isEnrolledAsync()
            if(!biometricRecords){
                alert('Biometria não cadastrada!')
            }else{
                result = await LocalAuthentication.authenticateAsync();
                if(result.success){
                    sendForm();
                }else{
                    setUser(null);
                    setPassword(null);
                }
            } 
        }
    }
    //Enviando para banco de dados!
    async function sendForm(){
        let response = await fetch('http://192.168.15.10:8081/login', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              nome: Users,
              password: password
            })
          });

          let json = await response.json();
          if(json === 'Error'){
              setDisplay('flex');
              setTimeout(() =>{
                setDisplay('none');
              }, 5000)
              await AsyncStorage.clear();
          }else{
              let userData = await AsyncStorage.setItem('userData', JSON.stringify(json))
              let resData = await AsyncStorage.getItem('userData')
                navigation.navigate('Restrita')
          }
    }

    return(
       <KeyboardAvoidingView style={[css.container,css.darkBg]} behavior={Platform.OS === "ios" ? "padding" : "height"}
       >
            <View>
                <Image
                    style={{marginBottom: 15, width:200, height:200}}
                    source={require('../assets/img/rastreio-icon.png')}
                />

            </View>

            <View>

                <Text style={css.Loginmsg(display)}>Usuario ou senha inválidos!</Text>
                
            </View>

            <View style={css.LoginForm}>
                <TextInput style={css.LoginInput}
                    placeholder="Usuario: "
                    onChangeText={text=>setUsers(text)}
                />
                 <TextInput style={css.LoginInput}
                    placeholder="Senha: "
                    secureTextEntry={true}
                    onChangeText={text=>setPassword(text)}
               />

               <TouchableOpacity style={css.loginBtn} onPress={() =>sendForm()}>
                   <Text style={css.BtnText}>Entrar</Text>
               </TouchableOpacity>
            
            </View>
       </KeyboardAvoidingView> 
        
    )
}