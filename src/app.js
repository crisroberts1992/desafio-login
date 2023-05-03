import express from 'express'
import session from 'express-session'
import { manejoDeErrores } from './middlewares/manejoDeErroresRest.js'
import { passportInitialize, passportSession } from './middlewares/passport.js'
import { engine } from 'express-handlebars'
import { apiRouter } from './routers/api/api.router.js'
import { port } from './config/server.config.js'
import { webRouter } from './routers/web/web.router.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./public'))

app.use(session({
    secret: '5ecr3t0',
    resave: false,
    saveUninitialized: false
}))

app.engine('handlebars', engine())
app.set('views', `./views`)
app.set('view engine', 'handlebars')

// acá cargo passport en el servidor express como middleware
app.use(passportInitialize, passportSession)

app.use('/', webRouter)
app.use('/api', apiRouter)

app.use(manejoDeErrores)

app.listen(port, () => { console.log('escuchando!') })