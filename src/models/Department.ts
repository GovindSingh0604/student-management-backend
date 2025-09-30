import mongoose, { Document, Schema } from 'mongoose';

export interface IDepartment extends Document {
  departmentCode: string;
  departmentName: string;
  createdAt: Date;
  updatedAt: Date;
}

const departmentSchema = new Schema<IDepartment>({
  departmentCode: {
    type: String,
    required: [true, 'Department code is required'],
    unique: true,
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

export default mongoose.model<IDepartment>('Department', departmentSchema);