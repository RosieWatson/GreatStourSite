module.exports = require('require-all')({
  dirname: __dirname,
  filter: /^(?!index)(.+?)\.js$/
})
