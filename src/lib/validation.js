const validation = module.exports = {}

// A function that checks whether a property exists within an object
validation.hasProperties = (obj, properties) => {
  return !(properties.map(p => obj.hasOwnProperty(p))).includes(false)
}

// Checks that an object contains properties that have truthy values
validation.hasTruthyProperties = (obj, properties) => {
  if (!validation.hasProperties(obj, properties)) return false
  return !(properties.map(p => !!obj[p])).includes(false)
}

// Checks the format of an email against a well known email regex
validation.checkEmailFormat = (email) => {
  // eslint-disable-next-line
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regex.test(email)
}
