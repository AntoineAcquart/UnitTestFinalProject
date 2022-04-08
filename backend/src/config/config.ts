export default {
  jwtSecret: "£dzpo6b8@d&",
  CRYPTO_SECRET_KEY: "jv63^0D51$",
  logger: {
    debug: true,
  },
  API_URL: "https://webservicecrm.herokuapp.com/",
  pictures: {
    path: "pictures/"
  },
  pagination: {
    nbResult: 10
  },
  validation: {
    minLength: 1,
    maxLength: 100,
    maxInt: 999999,
    phoneLength: 10,
    maxLengthText: 255
  }
}
