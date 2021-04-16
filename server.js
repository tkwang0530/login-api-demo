const express = require('express')
const requestPromise = require('request-promise')
const app = express()
// const allowCrossDomain = function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
//   res.header('Access-Control-Allow-Headers', 'Content-Type')
//   res.header('Access-Control-Allow-Headers', '*')
//   next()
// }
// app.use(allowCrossDomain)
app.use(express.static('public'))

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`Connected to the port ${port}`)
})

app.get('/hit', async(req, res) => {
  const email = req.query.email
  const nickname = req.query.nickname
  const apikey = req.query.apikey
  console.log('email', email)
  console.log('nickname', nickname)
  console.log('apikey', apikey)
  let options = {
    method: 'GET',
    uri: 'https://design.test/api/weba/v3/signin/chailease',
    headers: {
      'x-email': email,
      'x-nickname': nickname,
      'x-api-key': apikey
    },
    resolveWithFullResponse: true
  }
  const response = await requestPromise(options)
  console.log(response)
  console.log(response.body)
  // conso
  if (response.err) {
    res.send(response)
  } else {
    res.redirect("https://design.test/client/dashboard/site")
  }
})
