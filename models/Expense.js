const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, Number, Boolean, ObjectId, Date } = Schema.Types;

const expenseSchema = new Schema({
  merchant: {
    type: String,
    required: true
  },
  date: {
  type: Date,
  default: Date.now
  },
  total: {
      type: Number,
      required: true
  },
  category: {
      type: String,
      required: true
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 50
  },
  report: {
      type: Boolean,
      required: true,
      default: false
  },
  user: { type: ObjectId, ref: 'User', required: true }
});

module.exports = new Model('Expense', expenseSchema);