import { Schema, model, Model, Document } from "mongoose";
import User from "./user.model";

interface Coupon extends Document {
    contractor: Schema.Types.ObjectId | string;//will be changed in future 
    todaysSpent: number;
    monthlySpent: number;
    yearlySpent: number;
    monthlyLimit: number;
    yearlyLimit: number;
    studentId:Schema.Types.ObjectId;
}

const CouponSchema = new Schema<Coupon>({
    // contractor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    contractor:{type:String},
    todaysSpent: { type: Number, default: 0, min: 0 },
    monthlySpent: { type: Number, min: 0 },
    yearlySpent: { type: Number, min: 0 },
    monthlyLimit: { type: Number, min: 0 },
    yearlyLimit: { type: Number, min: 0 },
    studentId:{type:Schema.Types.ObjectId,ref:'User'}
}, { timestamps: true });

const CouponModel: Model<Coupon> = model<Coupon>('Coupon', CouponSchema);

export default CouponModel;
