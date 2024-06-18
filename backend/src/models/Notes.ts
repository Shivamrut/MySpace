import mongoose , {Schema, Document, Model}from "mongoose";

export interface INotes extends Document{
    user : mongoose.Types.ObjectId
    title : string
    description : string
    tag?: string
    date?: Date
}

const NotesSchema : Schema<INotes> = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,

    },
    tag: {
        type: String,
        default: "General"
    },
    date: {
        type: Date,
        default: Date.now
    },
});

export const Notes : Model<INotes> =  mongoose.model("notes", NotesSchema)