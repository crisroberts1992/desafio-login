import { Router } from 'express'
import { postUsuarios } from '../../controllers/api/usuarios.controller.js'
import * as sesionesController from '../../controllers/api/sesiones.controller.js'

export const apiRouter = Router()

apiRouter.post('/usuarios', postUsuarios)
apiRouter.post('/sesiones', sesionesController.postSesiones)
apiRouter.delete('/sesiones', sesionesController.deleteSesiones)