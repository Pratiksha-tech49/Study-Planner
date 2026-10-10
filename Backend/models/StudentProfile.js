const mongoose = require('mongoose');

const StudentProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  usn: { type: String, required: true },
  idCardNumber: { type: String, required: true },
  dob: { type: Date, required: true },
  branch: { type: String, default: "Computer Science & Engineering" },
  semester: { type: Number, default: 4 },
  targetLanguages: [{ type: String }]
});

module.exports = mongoose.model('StudentProfile', StudentProfileSchema);