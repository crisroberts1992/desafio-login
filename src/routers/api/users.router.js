import { Router } from 'express'
import { getUsersController, postUsersController } from '../../controllers/api/users.controller.js'

export const usersRouter = Router()

usersRouter.post('/', postUsersController)
usersRouter.get('/', getUsersController)