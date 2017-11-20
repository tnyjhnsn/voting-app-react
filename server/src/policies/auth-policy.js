const Joi = require('joi')

module.exports = {
  register(req, res, next) {
    const schema = {
      username: Joi.string().email(),
      password: Joi.string()
        .regex(new RegExp('^[a-zA-Z0-9]{6,32}$'))
    }
    Joi.validate(req.body, schema, (error) => {
      if (error) {
        switch (error.details[0].context.key) {
          case 'username':
            res.status(461).send('Invalid email')
            break
          case 'password':
            res.status(462).send('Invalid password')
            break
          default:
            res.status(460).send('Invalid registration')
        }
      } else {
        next()
      }
    })
  }
}
