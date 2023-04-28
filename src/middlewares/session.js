import MongoStore from 'connect-mongo'
import session from 'express-session'
import { MONGODB_CNX_STR } from '../config/mongodb.config.js'
import { SESSION_SECRET } from '../config/session.config.js'

export default session({
  store: MongoStore.create({ mongoUrl: MONGODB_CNX_STR }),
  saveUninitialized: false, //no quiero que se guarde siempre
  resave: false, //casi siempre de false salvo que una libreria lo pida en true
  secret: SESSION_SECRET //para que guarde los cookies
})