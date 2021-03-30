const express = require('express')
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
const port = 8081;
const Connection = require('./database/database')
const Users = require('./models/Users')
const Tracking = require('./models/Tracking')
const Product = require('./models/Product');
const { response } = require('express');
const QrCode = require('qrcode')
const Token = require('./models/Token')
const {Expo} = require('expo-server-sdk');

//DataBase
Connection.authenticate().then(() => {
    console.log('Connect Success!')
}).catch((error) => {
    console.log(error)
})


//Configs
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(express.static('assets'))

//Rotas

//Rota de Logim

app.post('/login', async (req,res) => {
    let response = await Users.findOne({
        where: {nome: req.body.nome, password: req.body.password}
    })
   if(response === null) {

    res.send(JSON.stringify('Error'))

   }else {
    res.send(response)
   }
})


//Rota verificação de senha e troca de senha

app.post('/verifyPass', async (req, res) => {
    let response = await Users.findOne({
        where: {id: req.body.id, password: req.body.senhaAntiga}
    })
    if(response === null) {

        res.send(JSON.stringify('Senha Antiga Não Confere!'))
    
       }else {
           if(req.body.novaSenha === req.body.confNovaSenha) {
               response.password = req.body.novaSenha;
               response.save();
               res.send(JSON.stringify('Senha Atualizada com sucesso!'));
           }else{
               res.send(JSON.stringify('Nova Senha ou Confirmação Incorreta!'))
           }
       }
})

//Criação de Produto no bancos

app.post('/create', async (req,res)=>{
    let TrackingId=''
    await Tracking.create({
        userId: req.body.userId,
        Codigo: req.body.code,
        local: req.body.local
    }).then((response)=>{
        TrackingId+= response.id;
    });

    await Product.create({
        TrackingId: TrackingId,
        name: req.body.product

    });

    QrCode.toDataURL(req.body.code).then(url=>{
        QrCode.toFile(
            './assets/img/code.png',
            req.body.code
            );
            
            res.send(JSON.stringify(url));
    })
});

app.post('/searchProduct', async (req,res)=>{
    let response = await Tracking.findOne({
        include:[{model:Product}],
        where: {Codigo: req.body.code},
    });
    res.send(JSON.stringify(response));
});


app.post('/rastreio', async (req,res)=>{
    let response=await Tracking.findOne({
        where:{Codigo:req.body.code},
        include:[{all:true}]
    });
    if(response === null){
        res.send(JSON.stringify(`Nenhum produto encontrado`));
    }else{
        res.send(JSON.stringify(`Sua encomenda ${response.Products[0].name} já está a caminho ${response.local}.`))
    }
});


let expo = new Expo();

//Envio das notificações
app.get('/notifications',async (req,res)=>{
    let messages = [];
    let somePushTokens=[];

    let response=await token.findAll({
        raw: true
    });
    response.map((elem,ind,obj)=>{
       somePushTokens.push(elem.token);
    });

    for (let pushToken of somePushTokens) {

        if (!Expo.isExpoPushToken(pushToken)) {
            console.error(`Push token ${pushToken} is not a valid Expo push token`);
            continue;
        }

        messages.push({
            to: pushToken,
            sound: 'default',
            title: 'WefLog',
            body: 'Bem vindo ao nosso app!',
            data: { withSome: 'data' },
        })
    }
    let chunks = expo.chunkPushNotifications(messages);
    let tickets = [];
    (async () => {
        for (let chunk of chunks) {
            try {
                let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
                console.log(ticketChunk);
                tickets.push(...ticketChunk);
            } catch (error) {
                console.error(error);
            }
        }
    })();
    let receiptIds = [];
    for (let ticket of tickets) {
        if (ticket.id) {
            receiptIds.push(ticket.id);
        }
    }

    let receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
    (async () => {
        for (let chunk of receiptIdChunks) {
            try {
                let receipts = await expo.getPushNotificationReceiptsAsync(chunk);
                console.log(receipts);

                for (let receiptId in receipts) {
                    let { status, message, details } = receipts[receiptId];
                    if (status === 'ok') {
                        continue;
                    } else if (status === 'error') {
                        console.error(
                            `There was an error sending a notification: ${message}`
                        );
                        if (details && details.error) {
                            console.error(`The error code is ${details.error}`);
                        }
                    }
                }
            } catch (error) {
                console.error(error);
            }
        }
    })();
});


//Servidor
app.listen(port, ()=>{
    console.log('Servidor Online')
})