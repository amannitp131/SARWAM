import { Schema, model, Model, Document } from "mongoose";
import User from "./user.model";
interface FoodItem {
    name: string;
    quantity?: number; 
    amount?:number;
}

interface RestOverFood extends Document {
    contractor: Schema.Types.ObjectId;
    foodItems: FoodItem[];
    dateAdded: Date;
}

const FoodItemSchema = new Schema<FoodItem>({
    name: { type: String, required: true },
    quantity: { type: Number, min: 0 }, 
    amount:{type:Number}
});

const RestOverFoodSchema = new Schema<RestOverFood>({
    contractor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    foodItems: { type: [FoodItemSchema], required: true },
    dateAdded: { type: Date, default: Date.now } 
}, { timestamps: true });

const RestOverFoodModel: Model<RestOverFood> = model<RestOverFood>('RestOverFood', RestOverFoodSchema);

export default RestOverFoodModel;
