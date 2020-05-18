Level 2

const express = require('express')
const fs = require('fs')

const PORT = 5002
const FLAG = process.env.FLAG || "???"
const SOURCE = fs.readFileSync('app.js')

const app = express()

app.get('/', (req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain;charset=utf-8')
  res.write("Level 2\n\n")

  if (!('X' in req.query)) {
    res.end(SOURCE)
    return
  }

  if (req.query.X.length > 800) {
    const s = JSON.stringify(req.query.X)
    if (s.length > 100) {
      res.end("Go away.")
      return
    }

    try {
      const k = '<' + req.query.X + '>'
      res.end("Close, but no cigar.")
    } catch {
      res.end(FLAG)
    }

  } else {
    res.end("No way.")
    return
  }
})

app.listen(PORT, () => {
  console.log(`Challenge listening at port ${PORT}`)
}) 
