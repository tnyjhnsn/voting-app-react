require('dotenv').load()
const path = require('path')
const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const authRoutes = require('./auth-routes')
const pollsRoutes = require('./polls-routes')
const User = require('./models/user')

const app = express()

app.use(require('morgan')('dev'))
app.use(require('cors')())
app.use(require('express-session')({
  secret: process.env.EXPRESS_SESSION,
  resave: false,
  saveUninitialized: false
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(passport.initialize())
app.use(passport.session())

/* eslint-disable no-console */
mongoose.connect(process.env.MONGO_URI, {
  useMongoClient: true
})
mongoose.connection.on(
  'error',
  console.error.bind(console, 'MongoDB connection error:')
)

passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(express.static(path.join(__dirname, '../../client/build')))

authRoutes(app)
pollsRoutes(app)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/build/index.html'))
})

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})
