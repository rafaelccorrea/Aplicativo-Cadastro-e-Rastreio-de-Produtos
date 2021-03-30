import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';import Ionicons from 'react-native-vector-icons/Ionicons';
import {Home, Rastreio, Login} from './views/index'
import Restrita from './views/restrita/Arearestrita'
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import {Notifications} from 'expo';

export default function index() {
  const Stack = createStackNavigator ();
  
  const [expoPushToken, setExpoPushToken] = useState(null);

useEffect(()=>{
  registerForPushNotificationsAsync();
},[]);

useEffect(()=>{
  if(expoPushToken != null){
      sendToken();
  }
},[expoPushToken]);


//Registra o token do usuário
async function registerForPushNotificationsAsync(){
    if (Constants.isDevice) {
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        const token = await Notifications.getExpoPushTokenAsync();
        setExpoPushToken(token);
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.createChannelAndroidAsync('default', {
            name: 'default',
            sound: true,
            priority: 'max',
            vibrate: [0, 250, 250, 250],
        });
    }
}

 //Envio do token
async function sendToken()
{
    let response = await fetch('http://192.168.15.10:8081/token',{
        method:'POST',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            token: expoPushToken
        })
    });
}
  
  
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" 
        component={Home} 
        options={{
          headerTitle: 'RastreiMax',
          headerStyle:{
            backgroundColor: '#f58634',
          },
          headerTitleStyle:{
            fontSize:22,
            alignSelf:'center',
            fontWeight:'bold',
          },
          headerTintColor: '#333'
        }}
        />
        <Stack.Screen
        name="Login" 
        component={Login} 
        options = {{
          headerShown: false
        }}
        />
        <Stack.Screen 
        name="Rastreio" 
        component={Rastreio} 
        />
      
        <Stack.Screen 
        name="Restrita" 
        component={Restrita}
        options={{
          headerShown: false
        }}
      
        />
      
      </Stack.Navigator>
    </NavigationContainer>
  );
}