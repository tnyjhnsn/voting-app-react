const AuthPolicy = require('./policies/auth-policy')
const AuthController = require('./controllers/auth-controller')

module.exports = (app) => {
  app.get(
    '/api/logout',
    AuthController.logout
  )

  app.post(
    '/api/createhash',
    AuthController.createHash
  )

  app.post(
    '/api/login',
    AuthController.login
  )

  app.post(
    '/api/register',
    AuthPolicy.register,
    AuthController.register
  )

  app.post(
    '/api/savepassword',
    AuthController.savePassword
  )
}
