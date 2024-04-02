import mongoose, {Mongoose} from "mongoose";

const MONGODB_URI = process.env.MONOGDB_URL;

interface MongooseConnection {
    conn: Mongoose | null;
    promise:  Promise<Mongoose> | null;
}

let cached : MongooseConnection = (global as any).mongoose;

if(!cached){
    cached = (global as any).mongoose = {
        conn: null ,
        promise: null 
    }
}

export const connectionToDatabase = async () => {
    // if not connected to db , connect else get cached connection
    if(cached.conn) return cached.conn;

    if(!MONGODB_URI){
        throw new Error('Missing Mongo_DB URL')
    }

    cached.promise = cached.promise || mongoose.connect(
        MONGODB_URI, { 
        dbName: 'chromashift',
        bufferCommands: false
    })

    cached.conn = await cached.promise;
}