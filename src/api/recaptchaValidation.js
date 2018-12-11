const app = require('../server.js')
const request = require('request')
const util = require('util')

app.post('/api/validate/recaptcha', async (req, res) => {
  let result
  const captchaResponse = req.body.response;
  console.log(captchaResponse)

  try {
    result = await util.promisify(request.post)('https://www.google.com/recaptcha/api/siteverify?secret='+ null + '&response=' + captchaResponse);
    console.log(result.body)
    console.log(result.body.success)
  } catch(e) {
    console.log(e);
  }

  return res.send({
    "success": result.body.success
  })
})