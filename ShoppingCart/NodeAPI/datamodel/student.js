const mongoose = require('mongoose');


const StudentSchema = new mongoose.Schema(
  {
    studentName: { type: String, required: true, trim: true },

    studentCourses: [{ type: String, trim: true }],

    courseProgress: { type: Number, min: 0, max: 100, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Student', StudentSchema);
