const errors = module.export = {}

// Mapping of short errors into human reading error messages
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
  },
  {
    short: 'MISSING_PARAMETERS',
    long: 'The request given was not fully formed.' // Might need to be made clearer if it's directly shown to a user?
  },
  {
    short: 'MALFORMED_EMAIL_FORMAT',
    long: 'The email supplied appears to be invalid.' // Might need to be made clearer if it's directly shown to a user?
  },
  {
    short: 'FAILED_TO_STORE_SUBSCRIPTION',
    long: 'Something went wrong whilst adding this user to the subscription database' // Might need to be made clearer if it's directly shown to a user?
  },
  {
    short: 'FAILED_EMAIL_DISPATCH',
    long: 'Something went wrong whilst sending an email!'
  },
  {
    short: 'FAILED_TO_REMOVE_SUBSCRIPTION',
    long: 'Something went wrong whilst removing the user\'s subscription.'
  },
  {
    short: 'FAILED_MQTTSENSORS_LOOKUP',
    long: 'Something went wrong whilst trying to lookup river sensor data from our database.'
  },
  {
    short: 'FAILED_TO_INSERT_TEST_FLOOD',
    long: 'Something went wrong whilst trying to trigger a test flood alert'
  },
  {
    short: 'FAILED_TO_DELETE_TEST_FLOOD',
    long: 'Something went wrong whilst trying to remove a test flood'
  },
  {
    short: 'FAILED_TO_SEND_TEST_EMAIL',
    long: 'Something went wrong whilst trying to send a test flood email'
  }
]

// Return the pretty format version of a defined error (lookup via shortError message)
// Allows the API to return short errors which can be translated to long errors for users
errors.pretty = (shortError) => {
  let r = null
  r = definedErrors.find(e => e.short === shortError)
  return (r && r.long) || 'Something went wrong...'
}
