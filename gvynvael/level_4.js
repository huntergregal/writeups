//Level 4

const express = require('express')
const fs = require('fs')
const path = require('path')

const PORT = 5004
const FLAG = process.env.FLAG || "???"
const SOURCE = fs.readFileSync(path.basename(__filename))

const app = express()

app.use(express.text({
  verify: (req, res, body) => {
    const magic = Buffer.from('ShowMeTheFlag')

    if (body.includes(magic)) {
      throw new Error("Go away.")
    }
  }
}))

app.post('/flag', (req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain;charset=utf-8')

  if ((typeof req.body) !== 'string') {
    res.end("What?")
    return
  }

  if (req.body.includes('ShowMeTheFlag')) {
    res.end(FLAG)
    return
  }

  res.end("Say the magic phrase!")
})

app.get('/', (req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain;charset=utf-8')
  res.write("Level 4\n\n")
  res.end(SOURCE)
})

app.listen(PORT, () => {
  console.log(`Challenge listening at port ${PORT}`)
})
