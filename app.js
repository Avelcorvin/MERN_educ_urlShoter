const express = require('express')
const PORT = require('config').get('port') || 5000
const URI = require('config').get('uri')
const mongoose = require('mongoose')
const path = require('path')
const app = express()



app.use(express.json({ extended: true }))
app.use('/api/auth', require('./routes/auth.routes'))//ипортируем модуль роутеров прямо в код
app.use('/api/links', require('./routes/createlink.routes'))//ипортируем модуль роутеров прямо в код
app.use('/links', require('./routes/redirect.routes'))//ипортируем модуль роутеров прямо в код

if(process.env.NODE_ENV ==='production'){
    app.use('/',express.static(path.join(__dirname,'client', 'build')))
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}



async function start() {

    try {
        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,

        })
        app.listen(PORT, () => console.log(`server is tarted Port is ${PORT}`))


    } catch (e) {
        console.log(`error`, e.message)
        process.exit()

    }


}


start()

