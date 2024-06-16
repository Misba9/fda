import mongoose from "mongoose";

export const  connectDB = async () =>{
    await mongoose.connect('mongodb+srv://ahmed:ahmed@fmcluster.9pid3zm.mongodb.net/').then(()=>console.log("DB Connected"))
}

//mongodb+srv://ahmed:<password>@cluster0.2boasx6.mongodb.net/
// add your mongoDB connection string above.
// Do not use '@' symbol in your databse user's password else it will show an error.