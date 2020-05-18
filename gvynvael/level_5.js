Level 5

const http = require('http')
const express = require('express')
const fs = require('fs')
const path = require('path')

const PORT = 5005
const FLAG = process.env.FLAG || "???"
const SOURCE = fs.readFileSync(path.basename(__filename))

const app = express()

app.use(express.urlencoded({extended: false}))

app.post('/flag', (req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain;charset=utf-8')

  if (req.body.secret !== 'ShowMeTheFlag') {
    res.end("Say the magic phrase!")
    return
  }

  if (req.youAreBanned) {
    res.end("How about no.")
    return
  }

  res.end(FLAG)
})

app.get('/', (req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain;charset=utf-8')
  res.write("Level 5\n\n")
  res.end(SOURCE)
})

const proxy = function(req, res) {
  req.youAreBanned = false
  let body = ''
  req
    .prependListener('data', (data) => { body += data })
    .prependListener('end', () => {
      const o = new URLSearchParams(body)
      req.youAreBanned = o.toString().includes("ShowMeTheFlag")
    })
  return app(req, res)
}

const server = http.createServer(proxy)
server.listen(PORT, () => {
  console.log(`Challenge listening at port ${PORT}`)
})
