const crypto = require('crypto')
const mongoose = require('mongoose')
const nodemailer = require('nodemailer')
const passport = require('passport')
const User = require('../models/user')

mongoose.Promise = global.Promise

module.exports = {
  async createHash(req, res) {
    const query = User.findOne(req.body)
    const foundUser = await query.exec()
    if (!foundUser) {
      return res.status(404).send('User not found')
    }
    const timeInMs = Date.now()
    const hashString = `${req.body.username}${timeInMs}`
    const secret = process.env.CRYPTO_SECRET
    const hash = crypto.createHmac('sha256', secret).update(hashString).digest('hex')
    foundUser.passwordReset = hash
    return foundUser.save((error) => {
      if (error) {
        return res.status(460).send('Save hash failed')
      }
      const smtpConfig = {
        host: 'stratus.faultseal.com',
        port: 25,
        secure: false,
        auth: {
          user: process.env.SMTP_USERNAME,
          pass: process.env.SMTP_PASSWORD
        },
        tls: {
          rejectUnauthorized: false
        }
      }
      const transporter = nodemailer.createTransport(smtpConfig)
      const mailOptions = {
        from: 'info@pollster',
        to: foundUser.username,
        subject: 'Reset your password at Pollster',
        text: `A password reset has been requested for the Pollster account connected to this email address. If you made this request, please click the following link: http://www.tosp.net.au:3005/account/change-password/${foundUser.passwordReset} ... if you didn't make this request, feel free to ignore it!`,
        html: `<p>A password reset has been requested for the Pollster account connected to this email address. If you made this request, please click the following link: <a href="http://www.tosp.net.au:3005/account/change-password/${foundUser.passwordReset}" target="_blank">http://www.tosp.net.au:3005/account/change-password/${foundUser.passwordReset}</a>.</p><p>If you didn't make this request, feel free to ignore it!</p>`
      }
      return transporter.sendMail(mailOptions, (err) => {
        if (err) {
          return res.status(461).send(err)
        }
        return res.status(200).send('OK')
      })
    })
  },

  logout(req, res) {
    req.logout()
    return res.status(200).send(req.user)
  },

  login(req, res) {
    passport.authenticate('local', (error, user) => {
      if (error || !user) {
        return res.status(401).send('Unauthorised')
      }
      return res.status(200).send({ user })
    })(req, res)
  },

  async register(req, res) {
    const query = User.findOne({ username: req.body.username })
    const foundUser = await query.exec()
    if (foundUser) {
      return res.status(401).send('Unauthorised')
    }
    if (!foundUser) {
      const newUser = new User({ username: req.body.username })
      return User.register(newUser, req.body.password, (error) => {
        if (error) {
          res.status(400).send(error)
        }
        passport.authenticate('local')(req, res, () =>
          res.status(200).send(req.user))
      })
    }
    return res.status(500).send('Unknown')
  },

  async savePassword(req, res) {
    const query = User.findOne({ passwordReset: req.body.hash })
    const foundUser = await query.exec()
    if (!foundUser) {
      return res.status(400).send('Hash not found')
    }
    return foundUser.setPassword(req.body.password, (error) => {
      if (error) {
        return res.status(400).send('Set password failed')
      }
      return foundUser.save((err) => {
        if (err) {
          return res.status(400).send('Save password failed')
        }
        return res.status(200).send('OK')
      })
    })
  }
}
