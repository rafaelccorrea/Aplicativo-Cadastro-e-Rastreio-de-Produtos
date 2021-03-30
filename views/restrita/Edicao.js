import React, {useState, useEffect} from 'react';
import {View, Text, Button, TextInput, TouchableOpacity} from 'react-native';
import Menu from '../../assets/componentes/menu'
import { BarCodeScanner } from 'expo-barcode-scanner';
import css from '../../css/main'
import * as Location from 'expo-location';
import Geocode from "react-native-geocode";

export default function Edicao({navigation}){
   
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [displayQR, setDisplayQR] = useState('flex');
    const [displayForm, setDisplayForm] = useState('none');
    const [code, setCode] = useState(null);
    const [localization, setLocalization] = useState(null);
    const [product, setProduct] = useState(null);


    useEffect(() => {
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);


    //Solicitar Permissao para localização
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
              setErrorMsg('Permission to access location was denied');
              return;
            }
          })();
    })


    //Retornar endereço usuario

    async function getLocation() {
        let location = await Location.getCurrentPositionAsync({});
        Geocode.initialize("AIzaSyBQzWy2fsXOmIAhG-ih7h6BHFWo-9uAN-Q");    
        Geocode.from(location, coords.latitude, coords.longitude)
        .then(json => {
            let number = json.results[0].address_components[0].short_name;
            let street = json.results[0].address_components[1].short_name;
            setLocalization(`${street} - ${number}`);
        })
        .catch(error => console.warn(error));
    }


    //Leitura do QRcode
    async function handleBarCodeScanned({ type, data }){
        setScanned(true);
        setDisplayQR('none');
        setDisplayForm('flex');
        setCode(data);
        await getLocation();
        await searchProduct(data)
      };
      
      async function searchProduct(codigo)
      {
          let response = await fetch('http://192.168.15.10:8081/searchProduct',{
              method: 'POST',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  code: codigo
              })
          });
          let json = await response.json();
          setProduct(json.Products[0].name);
      }

    async function sendForm(){

    }

    //Nova Leitura QRCODE

    async function readAgain(){
        setScanned(false);
        setDisplayQR('flex');
        setDisplayForm('none')
        setCode(null);
        setProduct(null);
        setLocalization(null)
    }

    return(
        <View>

            <Menu 
            title="Edição"
            navigation={navigation}
            />
            
            <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : value=> handleBarCodeScanned(value)}
            style={css.QRcode(displayQR)}
            />

            <View style={css.QRForm(displayForm)}>
            <Text style={{alignSelf:'center', marginBottom:10, marginTop:10}}>Codigo do produto: {code}</Text>    
                    <TextInput style={css.formEdit}
                    placeholder="Nome do produto"
                    onChangeText={text=>setProduct(text)}
                    value={product}
                    />

            </View>

            <View style={css.QRForm(displayForm)}>
                   
                    <TextInput style={css.formEdit}
                    placeholder="Localização do produto"
                    onChangeText={text=>setLocalization(text)}
                    value={localization}
                    />

            </View>

            <TouchableOpacity style={css.loginBtn} onPress={()=>sendForm()}>
                       <Text>Atualizar</Text>
                    </TouchableOpacity>
                
            {scanned &&
                        
                        <TouchableOpacity style={css.loginBtn} onPress={()=>readAgain()}>
                        <Text>Escanear Novamente</Text>
                     </TouchableOpacity>
            }

        </View>
    )
}