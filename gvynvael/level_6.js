//Level 6

const http = require('http')
const express = require('express')
const fs = require('fs')
const path = require('path')

const PORT = 5006
const FLAG = process.env.FLAG || "???"
const SOURCE = fs.readFileSync(path.basename(__filename))

const app = express()

const checkSecret = (secret) => {
  return
    [
      secret.split("").reverse().join(""),
      "xor",
      secret.split("").join("-")
    ].join('+')
}

app.get('/flag', (req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain;charset=utf-8')

  if (!req.query.secret1 || !req.query.secret2) {
    res.end("You are not even trying.")
    return
  }

  if (`<${checkSecret(req.query.secret1)}>` === req.query.secret2) {
    res.end(FLAG)
    return
  }

  res.end("Lul no.")
})

app.get('/', (req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain;charset=utf-8')
  res.write("Level 6\n\n")
  res.end(SOURCE)
})

app.listen(PORT, () => {
  console.log(`Example app listening at port ${PORT}`)
})
