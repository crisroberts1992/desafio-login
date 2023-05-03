import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { validarQueSeanIguales } from '../utils/criptografia.js'
import { usersManager } from '../managers/users.manager.js'
import { ErrorDeAutenticacion } from '../entidades/errors/ErrorDeAutenticacion.js'
import { Strategy as GithubStrategy } from 'passport-github2'
import { githubCallbackUrl, githubClientSecret, githubClienteId } from '../config/auth.config.js'
import { User } from '../entidades/User.js'

passport.use('local', new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
    // esto es lo que estaba en el controller de login
    const buscado = await usersManager.buscarPorEmail(username)
    if (!buscado)
        return done(new ErrorDeAutenticacion())
    if (!validarQueSeanIguales(password, buscado.password))
        return done(new ErrorDeAutenticacion())
    delete buscado.password
    done(null, buscado)
}))

passport.use('github', new GithubStrategy({
    clientID: githubClienteId,
    clientSecret: githubClientSecret,
    callbackURL: githubCallbackUrl
}, async (accessToken, refreshToken, profile, done) => {
    console.log(profile)
    let user
    try {
        user = await usersManager.buscarPorEmail(profile.username)
    } catch (error) {
        
        user = new User({
            email: profile.username,
        })
        await usersManager.guardar(user)
    }
    done(null, user)
}))

// esto lo tengo que agregar para que funcione passport! copiar y pegar, nada mas.
passport.serializeUser((user, next) => { next(null, user) })
passport.deserializeUser((user, next) => { next(null, user) })

// estos son para cargar en express como middlewares a nivel aplicacion
export const passportInitialize = passport.initialize()
export const passportSession = passport.session()

// estos son para cargar como middlewares antes de los controladores correspondientes
// export const authenticateLocal = 
export const autenticacionUserPass = passport.authenticate('local', { failWithError: true })
export const autenticacionPorGithub = passport.authenticate('github', { scope: ['user:email'] })
export const antenticacionPorGithub_CB = passport.authenticate('github', { failWithError: true })