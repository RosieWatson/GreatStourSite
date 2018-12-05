const errors = module.export = {}

const definedErrors = [
  {
    short: 'FAILED_GOVFLOODS_LOOKUP',
    long: 'Something went wrong trying to lookup flood data from our database.'
  },
  {
    short: 'FAILED_GOVSENSORS_LOOKUP',
    long: 'Something went wrong trying to lookup river sensor data from our database.'
  },
  {
    short: 'FAILED_REFRESH_QUOTA_CHECK',
    long: 'Something went wrong when validating our data\'s time-accuracy.'
  }
]

// Return the pretty format version of a defined error (lookup via shortError message)
// Allows the API to return short errors which can be translated to long errors for users
errors.pretty = (shortError) => {
  let r = null
  r = definedErrors.find(e => e.short === shortError)
  return (r && r.long) || 'Something went wrong...'
}
