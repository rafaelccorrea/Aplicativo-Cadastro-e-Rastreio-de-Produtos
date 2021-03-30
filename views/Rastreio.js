import React, {useState,useEffect} from 'react';
import {Text, View, Button, Image, TextInput, TouchableOpacity} from 'react-native';
import css from '../css/main'

export default function Rastreio({navigation}) {

    const [code, setCode] = useState(null);
    const [response, setResponse] = useState(null);

    //Envia os dados do formulário
    async function sendForm()
    {
        let response = await fetch('http://192.168.15.10:8081/rastreio',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code: code
            })
        });
        let json=await response.json();
        setResponse(json);
    }

    return (
        <View style={[css.container, css.backrast]}>
            <Image style={{width:200, height:200}} source={require('../assets/img/rastreio-icon.png')} />

            <TextInput style={css.editInput}
                    placeholder='Digite o código de rastreio:'
                    onChangeText={text=>setCode(text)}
            />

            <TouchableOpacity style={css.login__button} onPress={()=>sendForm()}>
                <Text style={css.TextRast}>Rastrear</Text>
            </TouchableOpacity>

            <Text>{response}</Text>
        </View>
    );
}