import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Base de datos conectada");
  } catch (error) {
    console.error("Error al conectarse con la base:", error);
    process.exit(1);
  }
};

export default connectDB;
