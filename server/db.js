const mongoose = require("mongoose");
const mongoURI = "mongodb+srv://incineroaraditya:bs8JYDjX3gUFu698@cluster0.w8kkztd.mongodb.net/inotebook?retryWrites=true&w=majority&appName=Cluster0/inotebook";
const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI,{
      });
    console.log("Connected to mongo!");
  } catch (error) {
    console.log("Connection failed : ", error);
  }
};

module.exports = connectToMongo;
