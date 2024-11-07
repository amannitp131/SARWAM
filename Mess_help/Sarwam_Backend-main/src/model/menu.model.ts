import { Schema, model, Model, Document } from "mongoose";
import User from "./user.model";
interface FoodItem extends Document {
    name: string;
    price: number;
    description?: string;
    isAvailable: boolean;
    imageUrl?: string;
}

const FoodItemSchema = new Schema<FoodItem>({
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    description: { type: String },
    isAvailable: { type: Boolean, default: true },
    imageUrl: { type: String }
}, { timestamps: true });

interface MessMenu extends Document {
    items: FoodItem[]; 
    contractor: Schema.Types.ObjectId;
}

const MessMenuSchema = new Schema<MessMenu>({
    items: { type: [FoodItemSchema], default: [] },
    contractor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const MessMenuModel: Model<MessMenu> = model<MessMenu>('MessMenu', MessMenuSchema);

export default MessMenuModel;
