//Level 3

// IMPORTANT NOTE:
// The secret flag you need to find is in the path name of this JavaScript file.
// So yes, to solve the task, you just need to find out what's the path name of
// this node.js/express script on the filesystem and that's it.

const express = require('express')
const fs = require('fs')
const path = require('path')

const PORT = 5003
const FLAG = process.env.FLAG || "???"
const SOURCE = fs.readFileSync(path.basename(__filename))

const app = express()

app.get('/', (req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain;charset=utf-8')
  res.write("Level 3\n\n")
  res.end(SOURCE)
})

app.get('/truecolors/:color', (req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain;charset=utf-8')

  const color = ('color' in req.params) ? req.params.color : '???'

  if (color === 'red' || color === 'green' || color === 'blue') {
    res.end('Yes! A true color!')
  } else {
    res.end('Hmm? No.')
  }
})

app.listen(PORT, () => {
  console.log(`Challenge listening at port ${PORT}`)
})
