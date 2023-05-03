import { User } from '../../entidades/User.js'
import { usersManager } from '../../managers/users.manager.js'
import { hashear } from '../../utils/criptografia.js'

export async function postUsersController(req, res, next) {

    const { email, password, first_name, last_name, age } = req.body

    const user = new User({
        email,
        password: hashear(password),
        nombre: first_name,
        apellido: last_name,
        edad: age,
    })

    await usersManager.guardar(user)

    // funcion de passport para que el registro ya me deje logueado tambien!
    req.login(user, error => {
        if (error) {
            next(new Error('falló el login!'))
        } else {
            res.status(201).json(req.user)
        }
    })
}

export async function getUsersController(req, res, next) {
    const users = await usersManager.obtenerTodos()
    res.json(users)
}