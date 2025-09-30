import express, { Request, Response } from 'express';
import Department from '../models/Department';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const departments = await Department.find().sort({ departmentCode: 1 });
    res.json(departments);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const { departmentCode, departmentName } = req.body;
    
    const existingDept = await Department.findOne({ departmentCode: departmentCode.toUpperCase() });
    if (existingDept) {
      return res.status(400).json({ message: 'Department code already exists' });
    }

    const department = new Department({
      departmentCode: departmentCode.toUpperCase(),
      departmentName
    });

    const newDepartment = await department.save();
    res.status(201).json(newDepartment);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const deletedDepartment = await Department.findByIdAndDelete(req.params.id);
    
    if (!deletedDepartment) {
      return res.status(404).json({ message: 'Department not found' });
    }
    
    res.json({ message: 'Department deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;