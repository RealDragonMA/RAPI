import mongoose, {connect, Connection} from "mongoose";
import Main from "../Main";

export default class MongoManager {

    private mongo?: Connection;

    public async connect() {
        try {
            if(!process.env.MONGO_URI) throw new Error("MONGO_URI is not defined")
            if(!process.env.MONGO_DB_NAME) throw new Error("MONGO_DB_NAME is not defined")
            mongoose.set("strictQuery", true);
            this.mongo = (await connect(process.env.MONGO_URI)).connection
            this.mongo?.useDb(process.env.MONGO_DB_NAME)
            Main.getLogger().info("Successfully connected to MongoDB !");
        } catch (error) {
            throw new Error("Cannot connect to MongoDB: " + error);
        }
    }

    public getMongo() {
        return this.mongo;
    }

}