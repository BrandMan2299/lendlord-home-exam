const mongoose = require('mongoose')

const collectionName = 'users'
const schemaName = 'users'
const SchemaTypes = mongoose.Schema

const schema = new mongoose.Schema(
  {
    _id: { type: String, auto: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    dateStarted: { type: Date, required: true },
    salary: { type: String, required: true },
  },
  { strict: false, autoCreate: true, timestamps: true, versionKey: false }
)

const model = mongoose.model(schemaName, schema, collectionName)

module.exports = model
module.exports.schema = schema
