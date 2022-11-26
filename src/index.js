import express from "express";
import dotenv from 'dotenv'
import morgan from "morgan";

const app = express()
dotenv.config({path: '.env'})

app.use(morgan('dev'))
app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))

app.set('port', process.env.PORT || 4000)
app.listen(app.get('port'), () => {
  console.log(`Conectado desde el puerto ${app.get('port')}`)
})
