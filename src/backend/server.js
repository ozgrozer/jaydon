const path = require('path')
const express = require('express')
const app = express()
const session = require('express-session')
const port = 1148

app.use(express.json())
app.set('views', path.join(__dirname, '..', 'frontend', 'html'))
app.use(express.static(path.join(__dirname, '..', '..', 'dist')))
app.set('view engine', 'pug')
app.use(session({
  resave: true,
  key: 'jaydon',
  saveUninitialized: true,
  secret: '2$2tc^/Q2nv7y^Zi',
  cookie: { maxAge: 2592000000 }
}))

app.listen(port, () => {
  console.log('Example app listening on port http://localhost:' + port)
})

app.get('/', (req, res) => {
  res.render('index', {
    defaults: {
      isAuthenticated: req.session.isAuthenticated || false
    }
  })
})
