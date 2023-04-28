import express from 'express'
import { engine } from 'express-handlebars'
import session from '../middlewares/session.js'
import { webRouter } from '../routers/web/webRouter.js'
import { apiRouter } from '../routers/api/apiRouter.js'

export const app = express()

app.use(express.static('./public')) //vinculo la carpeta public
app.use(express.json()) //si quiero enviar/recibir json atraves de fetch tengo que poner esto
                        //si quiero enviar formularios via html tengo que usar otro
app.use(session) //sale de express session , esta config en la carpeta mid

app.engine('handlebars', engine()) // vamos a usar handlebars
app.set('views', './views') // las vistas van a estar en la carpeta /views
app.set('view engine', 'handlebars') // por defecto se va a usar handlebars

app.use('/', webRouter)
app.use('/api', apiRouter)