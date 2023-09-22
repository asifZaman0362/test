const express = require('express')

const app = express()

app.use(express.static(__dirname + '/Build'))

app.listen(8000, () => console.log('app started'))
