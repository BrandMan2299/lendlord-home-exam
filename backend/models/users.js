const mongoose = require('mongoose')

const collectionName = 'users';
const schemaName = 'users';
const SchemaTypes = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    dateStarted: { type: Date, default: Date.now },
    salary: { type: Number, required: true },
    manager: { type: String },
    role: { type: String, enum: ['Manager', 'Worker', 'Driver'], required: true }
  },
  { strict: true, autoCreate: true, timestamps: true, versionKey: false }
)
const User = mongoose.model(schemaName, userSchema, collectionName);

module.exports = User;
module.exports.userSchema = userSchema;
