export function soloAutenticados(req, res, next) {
    if (req.session.user) {
      next() //deja pasar la persona si existe un user (es decir si esta registrada)
    } else {
      res.redirect('/login')
    }
  }