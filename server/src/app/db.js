import mongoose from 'mongoose';

export class MongoDBClient {
    static async connect(variablesEntorno) {
        try {
            const conex = await mongoose.connect(variablesEntorno.MONGODB_URI + "/" + variablesEntorno.MONGODB_DB_NAME);
            console.log(`MongoDB ha inicializado en: ${conex.connection.host}`);
        } catch (error) {
            console.error(`Error: ${error.message}`);
            process.exit(1);
        }
    }
}