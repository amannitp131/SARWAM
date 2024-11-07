import { Schema, model, Model, Document } from "mongoose";
import User from "./user.model";

interface PaymentHistory {
    amount: number; 
    date: Date;
}

interface Employee extends Document {
    name: string; 
    locality: string; 
    aadharNumber: string;
    image: string; 
    payment: number;
    paymentHistory: PaymentHistory[];
    contractor: Schema.Types.ObjectId;
    employeeType: string;
}

const PaymentHistorySchema = new Schema<PaymentHistory>({
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
}, { _id: false });

const EmployeeSchema = new Schema<Employee>({
    name: { type: String, required: true },
    locality: { type: String, required: true },
    aadharNumber: { type: String, required: true, unique: true },
    image: { type: String }, 
    payment: { type: Number, required: true },
    paymentHistory: { type: [PaymentHistorySchema], default: [] },
    contractor: { type: Schema.Types.ObjectId, ref: 'User', required: true }, 
    employeeType: { type: String, required: true }, 
}, { timestamps: true });

const EmployeeModel: Model<Employee> = model<Employee>('Employee', EmployeeSchema);

export default EmployeeModel;
