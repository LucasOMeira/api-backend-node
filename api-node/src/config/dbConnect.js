import mongoose from "mongoose";

mongoose.connect("mongodb+srv://meiralucas:butano@nodeapi.jtaueiy.mongodb.net/node-api");

let db = mongoose.connection;

export default db;