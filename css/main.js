import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

    imgIcons:{
      width: 100,
      height: 100
    },

    contImg:{
      flex:1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FFF'
    },

    btnHome: {
      marginRight:20
    },


    Loginmsg:(text="nome")=>({
      color: 'red',
      marginTop:10,
      marginBottom:15,
      display:text
    }),

    LoginForm:{
      width:'80%',
    },

    LoginInput:{
      backgroundColor: '#fff',
      fontSize:19,
      marginBottom: 15,
      padding:7,
      borderRadius:8,
      width: 280,
      alignItems: 'center',
      alignSelf:'center'
    },
    loginBtn:{

      backgroundColor: '#f58634',
      alignSelf:'center',
      borderRadius:5,
      padding:12,
      marginBottom:15
    
    },

    BtnText:{
      fontSize:22,
      fontWeight:'bold',
      color: '#333',
    },

    darkBg:{
      backgroundColor: '#333'
    },

    area__tab:{
      backgroundColor: '#333',
      fontSize:20,
      fontWeight:'bold',
      color: '#333',
    },

    area__title:{
      width: '80%',
      fontWeight:'bold',
      fontSize:20,
      color: '#fff',
      textAlign: 'center'
    },

    logout:{
      textAlign: 'right'
    },

    button__home2:{
      textAlign: 'left'
    },

    area__menu:{
      flexDirection: 'row',
      paddingTop: 40,
      paddingBottom: 10,
      width: '100%' ,
      backgroundColor: '#111',
      alignItems: 'center',
      justifyContent:'center'
    },

    container2:{

      justifyContent: 'flex-start'

    },

    ContGeral:{
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#999',
      marginTop: 10,
      borderRadius:8,
      height: 575,
      marginBottom: 10,
    },

    inputSenha: {
      width: 300,
      height: 50,
      backgroundColor: '#ccc',
      borderRadius:8
    },

    inputSenha1: {
      width: 300,
      height: 50,
      backgroundColor: '#ccc',
      borderRadius:8,
      marginTop: 10
    },

    inputSenha2: {
      width: 300,
      height: 50,
      backgroundColor: '#ccc',
      borderRadius:8,
      marginTop: 10
    },

    geralSenha:{
      backgroundColor: '#ccc',
      width: 90,
      height:30,
      justifyContent: 'center',
      textAlign:'center',
      marginTop: 25,
      marginBottom: 25,
      fontSize:20,
      fontWeight:'bold',
      color: '#333',
      borderRadius:8,
      alignSelf:'center'
    },

    AlSenha:{
      fontSize:20,
      fontWeight:'bold',
      color: '#333',
      marginBottom:18,
      alignSelf:'center'
    },

    qrcode:{
      alignItems:'center',
      marginTop:23,
      marginBottom:15,
    },

    btnCompQrcode:{
      backgroundColor: '#f58634',
      alignSelf:'center',
      borderRadius:5,
      padding:12,
      marginBottom:15,
      marginTop:15
    },

    QRcode:(display='flex')=>({
      width:'100%',
      height:'100%',
      backgroundColor: '#000',
      justifyContent: 'center',
      display: display
    }),
  
    QRForm:(display='none')=>({
      width:'100%',
      display: display
    }),

    formEdit:{
        width: 300,
        height: 50,
        backgroundColor: '#ccc',
        borderRadius:8,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf:'center',
        marginBottom:8
    },

    editInput: {
      backgroundColor: '#ccc',
      fontSize:19,
      marginBottom: 15,
      marginTop: 15,
      padding:7,
      borderRadius:8,
      width: 280,
      alignItems: 'center',
      alignSelf:'center'
    },

    backrast:{
      backgroundColor: '#fff'
    },

    login__button:{
      backgroundColor: '#ccc',
      width:100,
      height:40,
      alignSelf:'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius:8,
      marginBottom: 10
    },

    TextRast:{
      fontSize:18,
      fontWeight:'bold',
      fontStyle:'italic'
      
    }
  });
  