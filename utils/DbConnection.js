// Connection to the Blog DataBase

import mongoose from "mongoose";
import ServerConfig from "./ServerConfig.js";

export const connectToDatabase = () => {
  return mongoose.connect(ServerConfig.uri);
};
