import { Router } from 'express'
import { registroView } from '../../controllers/web/registro.controller.js'
import { soloAutenticados } from '../../middlewares/autenticacionWeb.js'
import { profileView } from '../../controllers/web/perfil.controller.js'
import { loginView } from '../../controllers/web/login.controller.js'

export const webRouter = Router()
webRouter.get('/login', loginView)
webRouter.get('/register', registroView)
webRouter.get('/profile', soloAutenticados, profileView)