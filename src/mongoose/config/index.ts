import mongoose from "mongoose";
import { DB_NAME } from "../../constants";

const connectDb = async () => {
    try {
        const instance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        console.log(`\nMongoDb connected\tDb host : ${instance.connection.host}`);
    } catch (error) {
        console.log("MongoDb connection error", error);
        process.exit(1);
    }
};

export default connectDb;
