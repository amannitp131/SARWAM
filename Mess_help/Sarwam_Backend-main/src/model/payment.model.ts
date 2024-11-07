import { Model, model, Schema } from 'mongoose';

const ItemSchema = new Schema({
  name: { type: String },
  price: { type: Number },
  quantity: { type: Number }
});

const PaymentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: { type: [ItemSchema], required: true },
  totalAmount: { type: Number, required: true },
}, { timestamps: true });

interface Payment {
  user: Schema.Types.ObjectId;
  items: Array<{ name: string; price: number; quantity: number }>;
  totalAmount: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const PaymentModel: Model<Payment> = model<Payment>('Payment', PaymentSchema);

export default PaymentModel;
