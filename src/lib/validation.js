const validation = module.exports = {}

validation.hasProperties = (obj, properties) => {
  return !(properties.map(p => obj.hasOwnProperty(p))).includes(false)
}

validation.hasTruthyProperties = (obj, properties) => {
  if (!validation.hasProperties(obj, properties)) return false
  return !(properties.map(p => !!obj[p])).includes(false)
}

validation.checkEmailFormat = (email) => {
  // eslint-disable-next-line
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regex.test(email)
}
