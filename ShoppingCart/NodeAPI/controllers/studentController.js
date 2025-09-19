// controllers/studentController.js
const Student = require('../datamodel/student');

// GET /api/students
exports.getAll = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    console.log("Fetched students:", students);
    
    res.json(students);
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch students', error: e.message });
  }
};

// GET /api/students/:id
exports.getOne = async (req, res) => {
  try {
    const s = await Student.findById(req.params.id);
    console.log("Fetched student:", s );
    if (!s) return res.status(404).json({ message: 'Student not found' });
    res.json(s);
  } catch (e) {
    res.status(400).json({ message: 'Invalid ID', error: e.message });
  }
};

// POST /api/students
exports.create = async (req, res) => {
  try {
    const { studentName, studentCourses = [], courseProgress = 0 } = req.body;
    const s = await Student.create({ studentName, studentCourses, courseProgress });
        console.log("Edited student:", s );

    res.status(201).json(s);
  } catch (e) {
    res.status(400).json({ message: 'Create failed', error: e.message });
  }
};

// PUT /api/students/:id
exports.update = async (req, res) => {
  try {
    const s = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!s) return res.status(404).json({ message: 'Student not found' });
    res.json(s);
  } catch (e) {
    res.status(400).json({ message: 'Update failed', error: e.message });
  }
};

// DELETE /api/students/:id
exports.remove = async (req, res) => {
  try {
    const s = await Student.findByIdAndDelete(req.params.id);
    if (!s) return res.status(404).json({ message: 'Student not found' });
    res.json({ ok: true });
  } catch (e) {
    res.status(400).json({ message: 'Delete failed', error: e.message });
  }
};
