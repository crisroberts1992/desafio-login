import express from 'express'
import { engine } from 'express-handlebars'
import session from '../middlewares/session.js'
import { webRouter } from '../routers/web/webRouter.js'
import { apiRouter } from '../routers/api/apiRouter.js'

export const app = express()

app.use(express.static('./public'))
app.use(express.json())
app.use(session)

app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')

app.use('/', webRouter)
app.use('/api', apiRouter)