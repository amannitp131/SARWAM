import { Schema, model, Model, Document } from "mongoose";
import User from "./user.model";

interface FoodItemDetail {
    name: string;
    price: number; 
    quantity: number; 
}

interface Inventory extends Document {
    items: FoodItemDetail[];
    contractor: Schema.Types.ObjectId;
}

const FoodItemDetailSchema = new Schema<FoodItemDetail>({
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 0 },
}, { _id: false });

const InventorySchema = new Schema<Inventory>({
    items: { type: [FoodItemDetailSchema], required: true },
    contractor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const InventoryModel: Model<Inventory> = model<Inventory>('Inventory', InventorySchema);

export default InventoryModel;
