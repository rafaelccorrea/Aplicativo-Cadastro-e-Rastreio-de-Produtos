import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Profile from '../restrita/Profile'
import Cadastro from '../restrita/Cadastro'
import Edicao from '../restrita/Edicao'
import css from '../../css/main'
import Icon from 'react-native-vector-icons/FontAwesome';
import {BackHandler, Alert} from 'react-native'

const Tab = createMaterialBottomTabNavigator();


export default function Restrita({navigation}){
    
    //Mensagem de Boa vindas buscando nome do usuario
    const [User, setUsers] = useState(null);

    useEffect(() =>{
        async function getUsers(){
            let response = await AsyncStorage.getItem('userData')
            let json = JSON.parse(response);
            setUsers(json.nome);
        }
        getUsers();
    }, [])
    
//Presionar o botao voltar no android fecha o APP
    useEffect(() => {
        const backAction = () => {
          Alert.alert("Alerta!", "Voçê sairá do App, Deseja Prosseguir?", [
            {
              text: "Não",
              onPress: () => null,
              style: "cancel"
            },
            { text: "Sim", onPress: () => 
            BackHandler.exitApp() }
          ]);
          return true;
        };
    
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        );
    
        return () => backHandler.remove();
      }, []);


    return(
        <Tab.Navigator
        activeColor='#f58634'
        inactiveColor="#fff"
        barStyle={css.area__tab}
        >
        <Tab.Screen 
        name="Profile" 
        component={Profile}
        options = {{
            tabBarIcon:()=>(
                <Icon name='user' size={20} color="#999" />
           )
        }}
         />
        <Tab.Screen 
        name="Cadastro" 
        component={Cadastro} 
        options = {{
            tabBarIcon:()=>(
                <Icon name='plus' size={20} color="#999" />
                
                )
        }}
         />
        <Tab.Screen 
        name="Edicao" 
        component={Edicao}
        options = {{
            tabBarIcon:()=>(
                <Icon name='edit' size={20} color="#999" />
            )
        }}
        />
      </Tab.Navigator>
    )
}