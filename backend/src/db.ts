import mongoose from "mongoose";

const mongoURI: string = "mongodb+srv://incineroaraditya:bs8JYDjX3gUFu698@cluster0.w8kkztd.mongodb.net/inotebook?retryWrites=true&w=majority&appName=Cluster0/inotebook";

export const connectToMongo = async (): Promise<void> => {
    try {
        await mongoose.connect(mongoURI, {
        })
        console.log("Connected to MongoDb!");

    }
    catch (err) {
        console.log("Connection to Mongo failed!\n", err);

    }
}
