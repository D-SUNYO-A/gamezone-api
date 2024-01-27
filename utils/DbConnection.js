// Connection to the Blog DataBase

import mongoose from "mongoose";

export const connectToDatabase = () => {
  const uri = "mongodb+srv://sdanarson1:YF078se0zrRptXYn@cluster0.ebxzpgl.mongodb.net/blog?retryWrites=true&w=majority";
  return mongoose.connect(uri);
};
