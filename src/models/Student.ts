import mongoose, { Document, Schema } from 'mongoose';

export interface IStudent extends Document {
  studentName: string;
  studentRollNo: string;
  age: number;
  departmentCode: string;
  departmentName: string;
  createdAt: Date;
  updatedAt: Date;
}

const studentSchema = new Schema<IStudent>({
  studentName: {
    type: String,
    required: [true, 'Student name is required'],
    trim: true
  },
  studentRollNo: {
    type: String,
    required: [true, 'Roll number is required'],
    unique: true,
    trim: true,
    uppercase: true
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [1, 'Age must be at least 1'],
    max: [100, 'Age must be less than 100']
  },
  departmentCode: {
    type: String,
    required: [true, 'Department code is required'],
    trim: true,
    uppercase: true
  },
  departmentName: {
    type: String,
    required: [true, 'Department name is required'],
    trim: true
  }
}, {
  timestamps: true
});

export default mongoose.model<IStudent>('Student', studentSchema);