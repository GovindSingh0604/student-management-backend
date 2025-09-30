import express, { Request, Response } from 'express';
import Student from '../models/Student';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const students = await Student.find().sort({ departmentCode: 1, studentRollNo: 1 });
    res.json(students);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const { studentName, studentRollNo, age, departmentCode, departmentName } = req.body;
    
    const existingStudent = await Student.findOne({ 
      studentRollNo: studentRollNo.toUpperCase() 
    });
    
    if (existingStudent) {
      return res.status(400).json({ message: 'Roll number already exists' });
    }

    const student = new Student({
      studentName,
      studentRollNo: studentRollNo.toUpperCase(),
      age,
      departmentCode: departmentCode.toUpperCase(),
      departmentName
    });

    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    
    if (!deletedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    res.json({ message: 'Student deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;