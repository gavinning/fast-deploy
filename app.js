const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const mkdirp = require('mkdirp')
const uploader = require('koa2-upload')
const config = require('./config')
const routes = require('./routes')

onerror(app)
mkdirp(config.tmpdir)

app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(uploader({ autoDelete: true, uploadDir: config.tmpdir }))

app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

routes(app)

app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
