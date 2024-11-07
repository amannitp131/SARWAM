import { Schema, model, Model, Document } from "mongoose";

interface SocialMediaProfiles {
    [platform: string]: string; // { facebook: 'url', twitter: 'url' }
}

interface Creator {
    image: string;
    description: string;
    academics: string;
    socialMediaProfiles: SocialMediaProfiles;
}

interface Faq {
    question: string;
    answer: string;
}

interface Comment {
    user: string;
    content: string;
    date: Date;
    replies?: Comment[];
}

export interface Home extends Document {
    heroImage: string[];
    totalContractorsAssociated: number;
    totalStudentsAssociated: number;
    totalMessAssociated: number;
    totalNgoAssociated: number;
    faq: Faq[];
    navbar: ('login' | 'sign up' | 'contractor student' | 'help' | 'contact')[];
    comments: Comment[];
    creators: Creator[];
    lastUpdated?: Date;
    featuredContent?: string;
}

const HomeSchema = new Schema<Home>({
    heroImage: { type: [String], required: true },
    totalContractorsAssociated: { type: Number, required: true },
    totalStudentsAssociated: { type: Number, required: true },
    totalMessAssociated: { type: Number, required: true },
    totalNgoAssociated: { type: Number, required: true },
    faq: [{ question: { type: String, required: true }, answer: { type: String, required: true } }],
    navbar: { type: [String], enum: ['login', 'sign up', 'contractor student', 'help', 'contact'], required: true },
    comments: [{
        user: { type: String, required: true },
        content: { type: String, required: true },
        date: { type: Date, default: Date.now },
        replies: [{ user: { type: String, required: true }, content: { type: String, required: true }, date: { type: Date, default: Date.now } }]
    }],
    creators: [{
        image: { type: String, required: true },
        description: { type: String, required: true },
        academics: { type: String, required: true },
        socialMediaProfiles: { type: Map, of: String, required: true } 
    }],
    lastUpdated: { type: Date, default: Date.now },
    featuredContent: { type: String }
},{ timestamps: true } );

const HomePage: Model<Home> = model<Home>('Home', HomeSchema);

export default HomePage;
