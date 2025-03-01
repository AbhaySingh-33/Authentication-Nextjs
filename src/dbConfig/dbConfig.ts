import mongoose from "mongoose";

export async function connect() {
    try {
        const mongoUrl = process.env.MONGO_URL;
        if (!mongoUrl) {
            throw new Error("MONGO_URL environment variable is not defined");
        }
        await mongoose.connect(mongoUrl);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("Successfully connected to database");
        });

        connection.on('error', (err) => {
            console.log("Error connecting to database: " + err);
            process.exit();
        });

    } catch (error) {
        console.error("Database connection error:", error);
        process.exit(1);
    }
}