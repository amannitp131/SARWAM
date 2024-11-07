import { Schema, model, Model, Document } from "mongoose";
import User from "./user.model";

interface ChatMessage {
    user: Schema.Types.ObjectId;
    content: string;
    date: Date;
}

interface Ticket extends Document {
    user: Schema.Types.ObjectId;
    contractor: Schema.Types.ObjectId;
    subject: string;
    status: 'open' | 'in-progress' | 'closed';
    messages: ChatMessage[];
}

const ChatMessageSchema = new Schema<ChatMessage>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
}, { _id: false });

const TicketSchema = new Schema<Ticket>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    contractor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    subject: { type: String, required: true },
    status: { type: String, enum: ['open', 'in-progress', 'closed'], default: 'open' },
    messages: { type: [ChatMessageSchema], default: [] },
}, { timestamps: true });

const TicketModel: Model<Ticket> = model<Ticket>('Ticket', TicketSchema);

export default TicketModel;
