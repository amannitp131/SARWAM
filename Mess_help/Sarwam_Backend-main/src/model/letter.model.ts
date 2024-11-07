import { Schema, model, Model, Document } from "mongoose";
import User from "./user.model";

interface Leave extends Document {
    contractor: Schema.Types.ObjectId | String;//will be change in futrue
    user: Schema.Types.ObjectId;
    reason: string;
    letterLink: string;
    isVerified: boolean;
}

const LeaveSchema = new Schema<Leave>({
    // contractor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    contractor:{type:String},
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    reason: { type: String, required: true },
    letterLink: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
}, { timestamps: true });

const LeaveModel: Model<Leave> = model<Leave>('Leave', LeaveSchema);

export default LeaveModel;
