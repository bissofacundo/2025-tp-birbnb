import mongoose from "mongoose";

export class MongoDBClient {
    static async connect () {
        try {
            const connect = await mongoose.connect('mongodb://127.0.0.1:27017/birbnb') //meter en .env
            console.log(`te conectaste a ${connect.connection.host}`)
        } catch (error) {
            console.error(`Error: ${error.message}`)
            process.exit(1)
        }
    }
}