import { Schema, model, Model, Document, ObjectId } from "mongoose";
type UserType = 'Student' | 'Contractor' | 'Admin';
interface Worker {
    name: string;
    role: string;
    contact: string;
}
interface User extends Document {
    _id:ObjectId;
    username: string;
    password: string;
    name: string;
    rollNo?: any;
    college: string;
    hostelName?: string; 
    messContractorName?: string;
    type: UserType;
    contractorName?: string;
    workers?: Worker[]; 
    email?:string;
    isVerified: { type: Boolean, default: false },
}

const UserSchema = new Schema<User>({
    username: { type: String, unique: true },
    password: { type: String, },
    name: { type: String },
    email:{type:String},
    rollNo: {type:Number},
    college: { type: String },
    hostelName: { type: String }, 
    messContractorName: { type: String },
    type: { type: String, enum: ['Student', 'Contractor', 'Admin'],default:'Student'},
    contractorName: { type: String },
    workers: [{
        name: { type: String },
        role: { type: String},
        contact: { type: String}
    }],
    isVerified: { type: Boolean, default: false },
}, { timestamps: true });

const User: Model<User> = model<User>('User', UserSchema);

export default User;
