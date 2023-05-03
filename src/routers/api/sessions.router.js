import { Router } from 'express'
import { soloLogueadosApi } from '../../middlewares/soloLogueados.js'
import {
    postSessionsController,
    getCurrentSessionController,
    logoutSessionsController
} from '../../controllers/api/sessions.controller.js'
import { antenticacionPorGithub_CB, autenticacionPorGithub, autenticacionUserPass } from '../../middlewares/passport.js'

export const sessionsRouter = Router()

// login local
sessionsRouter.post('/', autenticacionUserPass, postSessionsController)

// login con github
sessionsRouter.get('/github', autenticacionPorGithub)
sessionsRouter.get('/githubcallback', antenticacionPorGithub_CB, (req, res, next) => { res.redirect('/') })

// logout
sessionsRouter.post('/logout', logoutSessionsController)

// datos de sesion, para testear!
sessionsRouter.get('/current', soloLogueadosApi, getCurrentSessionController)