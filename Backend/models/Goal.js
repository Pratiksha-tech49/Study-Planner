const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema({
  type: { type: String, enum: ['Daily', 'Weekly', 'Monthly'], required: true },
  category: { type: String, enum: ['Academic', 'DSA', 'DBMS', 'Upskilling'], required: true },
  title: { type: String, required: true },
  targetDate: { type: Date, required: true },
  completed: { type: Boolean, default: false }
});

module.exports = mongoose.model('Goal', GoalSchema);