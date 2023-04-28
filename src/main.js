import mongoose from 'mongoose'
import { app } from './app/server.js'
import { PORT } from './config/server.config.js'
import { MONGODB_CNX_STR } from './config/mongodb.config.js'

await mongoose.connect(MONGODB_CNX_STR) //conecto la base de datos
  .then(() => {
    console.log(`conectado a base de datos en: "${MONGODB_CNX_STR}"`)
  })

app.listen(PORT, () => {
  console.log(`escuchando peticiones en puerto: ${PORT}`)
})