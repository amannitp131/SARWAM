import { Schema, model, Model, Document } from "mongoose";
import UserModel from "./user.model";
interface Message extends Document {
    sender: Schema.Types.ObjectId; 
    receiver: Schema.Types.ObjectId; 
    content: string;
    date: Date; 
    replies?: Message[]; 
}

const MessageSchema = new Schema<Message>({
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true }, 
    receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
    replies: [{ type: Schema.Types.ObjectId, ref: 'Message' }] 
}, { timestamps: true });

const ChatModel: Model<Message> = model<Message>('Message', MessageSchema);

export default ChatModel;
