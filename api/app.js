const express = require('express')
const bodyParser = require('body-parser')

// Constants
const PORT = 8080
const HOST = '0.0.0.0'

const app = express()

app.use(bodyParser.json())

const basePath = '/v1'
app.use(`${basePath}/articles`, require('./routes/articles_controller'))
app.use(`${basePath}/article`, require('./routes/article_controller'))
app.use(`${basePath}/tags`, require('./routes/tag_controller'))

app.listen(PORT, HOST)
console.log(`Running on http://${HOST}:${PORT}`)
