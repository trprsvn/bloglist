require('dotenv').config()
const {
  PORT, TEST_MONGODB_URI, NODE_ENV, SECRET,
} = process.env
let { MONGODB_URI } = process.env

if (NODE_ENV === 'test') {
  MONGODB_URI = TEST_MONGODB_URI
}
module.exports = { PORT, MONGODB_URI, SECRET }
