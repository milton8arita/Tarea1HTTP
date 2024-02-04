const mongoose = require('mongoose')
const express = require('express');

const app = express();

const url = 'mongodb://127.0.0.1:27017/tarea1';


mongoose.connect(url)
    .then(() => 
        console.log('Llegando a mongodb ... '))
    .catch((e) => 
        console.log('Error en : '+e)
    );


const gasolineraSchema = mongoose.Schema({
    nombreGasolinera: String,
    direccion: String,
    latitud: Number,
    longitud: Number,
}, {versionkey:false});

const gasolineraModel = mongoose.model('gasol', gasolineraSchema)

const insertar = async() =>{
    const gasolinera = new gasolineraModel({
        nombreGasolinera: 'Texaco',
        direccion: 'quimistan',
        latitud: 40.7128,
        longitud: -74.0060
    })
   const resultado = await gasolinera.save()
   console.log(resultado)
}


const mostrar = async()=>{
    const gasolinera = await gasolineraModel.find()
    console.log(gasolinera)
}

const actualizar = async(id) =>{
    const gasolinera = await gasolineraModel.updateOne({_id:id},{
        $set:{
        nombreGasolinera: 'UNO',
        direccion: 'San marcos',
        latitud: 39.6154,
        longitud: -64.0030
    }})
}

const eliminar = async(id)=>{
    const gasolinera = await gasolineraModel.deleteOne({_id:id})
    console.log(gasolinera)
}


app.get('/', (req, res)=>{
    res.send('Mostrando Get Cambios en el servidor,')
    console.log('Doble Verificacion GET')
})

app.post('/', (req, res)=>{
    res.send('Operacion Post funcionando')
    console.log('Doble verificaicon POST')
})

app.put('/', (req, res)=>{
    res.send('Operacion Put Funcinando')
    console.log('Doble verificacion en PUT')
})

app.delete('/', (req, res)=>{
    res.send('Operacion Detele funcionando')
    console.log('Doble verificacion Delete')
})

//tambie funciona con el 3000
app.listen(8080, ()=>{
    console.log('Servidor Ejecutandose...!')
})

//eliminar();