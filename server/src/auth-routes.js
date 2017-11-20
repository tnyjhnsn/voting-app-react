const AuthPolicy = require('./policies/auth-policy')
const AuthController = require('./controllers/auth-controller')

module.exports = (app) => {
  app.get(
    '/logout',
    AuthController.logout
  )

  app.post(
    '/createhash',
    AuthController.createHash
  )

  app.post(
    '/login',
    AuthController.login
  )

  app.post(
    '/register',
    AuthPolicy.register,
    AuthController.register
  )

  app.post(
    '/savepassword',
    AuthController.savePassword
  )
}
