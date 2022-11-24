require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')

const { connectDB, mongoose } = require('./lib/mongodb')
const { googleStrategy } = require('./lib/passport')

const oauthRouter = require('./routes/oauth')
const usersRouter = require('./routes/users')
const roomsRouter = require('./routes/rooms')

connectDB()

const app = express()

app.use(bodyParser.json())
app.use(
  cors({
    origin: true,
    credentials: true,
  })
)

app.set('trust proxy', 1) // trust first proxy
app.use(
  session({
    store: new MongoStore({
      mongoUrl: mongoose.connection._connectionString,
    }),
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 14 * 24 * 60 * 60 * 1000,
      sameSite: process.env.NODE_ENV === 'production' && 'none',
      secure: process.env.NODE_ENV === 'production',
    },
    resave: false,
    saveUninitialized: false,
  })
)

passport.use(googleStrategy)
app.use(passport.initialize())
app.use(passport.session())

app.set('view engine', 'pug')

app.use('/oauth', oauthRouter)
app.use('/users', usersRouter)
app.use('/rooms', roomsRouter)

module.exports = app
