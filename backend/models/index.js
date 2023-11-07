const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

require('dotenv').config()


mongoose?.connection?.on('connected', () => {
  log.info('Mongoose connected')
})

mongoose?.connection?.on('disconnected', () => {
  log.info('Mongoose disconnected')
})

mongoose?.connection?.on('error', err => {
  log.error('Mongoose error', err)
})

module.exports.init = async () => {
  console.log(process.env.MONGO_CONN_STRING);
  const connString = process.env.MONGO_CONN_STRING ? process.env.MONGO_CONN_STRING : config.database
  await mongoose.connect(connString)

  log.info('connected to database')
}
