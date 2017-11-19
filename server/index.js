import express from 'express'
import { Nuxt, Builder } from 'nuxt'
import bodyParser from 'body-parser'
import session from 'express-session'
const MongoStore = require('connect-mongo')(session); // session连接mongoose
// const mongoose = require('mongoose')
import mongoose from 'mongoose'
import api from './api'
const env = process.env.NODE_ENV || 'development'

const app = express()
// const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 8081

let dbUrl = "mongodb://47.104.98.140:27017/nuxt_blog"
if (env === "development") {
  dbUrl = "mongodb://localhost:27017/nuxt_blog"
}
// 数据库设置
const db = mongoose.connect(dbUrl);
// const db = mongoose.connect("mongodb://localhost:27017/nuxt_blog");
// 数据库连接
db.connection.on("error", function(error) {
  console.log("数据库连接失败：" + error);
});
db.connection.on("open", function() {
  console.log("------数据库连接成功！------");
});

app.set('port', port)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
      extended: true
}));
// Sessions 来创建 req.session
app.use(session({
  secret: 'super-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 * 60 * 24 }, // 一天
  store: new MongoStore({mongooseConnection: db.connection})
}))

// Import API Routes
app.use('/api', api)

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

// Init Nuxt.js
const nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

// Give nuxt middleware to express
app.use(nuxt.render)

// Listen the server
app.listen(port)
console.log('Server listening on '  + ':' + port) // eslint-disable-line no-console
