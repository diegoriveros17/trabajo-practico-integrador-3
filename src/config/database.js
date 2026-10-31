import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}${process.env.DB_NAME}`);
    console.log(`Conectado a la base de datos`);
  } catch (error) {
    console.log(`Error interno del servidor, error: ${error}`);
  }
};
