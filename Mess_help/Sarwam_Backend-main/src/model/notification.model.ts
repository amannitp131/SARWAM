import { Schema, model, Model, Document } from "mongoose";
import User from "./user.model";

interface Notification extends Document {
    user: Schema.Types.ObjectId;
    message: string;
    type: string;
    status: 'unread' | 'read';
    createdAt: Date;
}

const NotificationSchema = new Schema<Notification>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    type: { type: String, required: true },
    status: { type: String, enum: ['unread', 'read'], default: 'unread' },
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

const NotificationModel: Model<Notification> = model<Notification>('Notification', NotificationSchema);

export default NotificationModel;
