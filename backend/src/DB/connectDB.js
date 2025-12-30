import mongoose from "mongoose";

const dbName = "myTube";

const connectWithDatabase = async () => {
  try {
    const connect = await mongoose.connect(
      `${process.env.MONGODB_URI}/${dbName}`
    );

    if (connect) {
      console.log("DB Connected Successfully ⚙️ ⚙️ ⚙️");
    }
  } catch (error) {
    console.log("DB Connect Error - ", error);
  }
};


export default connectWithDatabase;