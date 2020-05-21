//Level 1

const express = require('express')
const fs = require('fs')

const PORT = 5001
const FLAG = process.env.FLAG || "???"
const SOURCE = fs.readFileSync('app.js')

const app = express()

app.get('/', (req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain;charset=utf-8')
  res.write("Level 1\n\n")

  if (!('secret' in req.query)) {
    res.end(SOURCE)
    return
  }

  if (req.query.secret.length > 5) {
    res.end("I don't allow it.")
    return
  }

  if (req.query.secret != "GIVEmeTHEflagNOW") {
    res.end("Wrong secret.")
    return
  }

  res.end(FLAG)
})

app.listen(PORT, () => {
  console.log(`Example app listening at port ${PORT}`)
}) 
