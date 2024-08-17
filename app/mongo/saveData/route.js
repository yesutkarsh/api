import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { MongoClient } from "mongodb";

export async function POST() {
    const header = headers();
    let parsedData;
    let data = header.get("data");

    try {
        // Parse the JSON data from the header
        parsedData = JSON.parse(data);
        console.log("Parsed data:", parsedData);
    } catch (error) {
        console.error("Error parsing JSON:", error);
        return NextResponse.json({ message: "Invalid JSON data!" }, { status: 400 });
    }

    console.log("Parsed data name:", parsedData?.name);
    console.log("MongoDB URI:", process.env.MONGODB_URI);

    const client = new MongoClient(process.env.MONGODB_URI);

    try {
        await client.connect();
        console.log("Connected to MongoDB");

        // Choose a name for your database
        const database = client.db("ecommers-user-data");

        // Choose a name for your collection
        const collection = database.collection("ecommerce-users");

        // Insert the parsed JSON data into the collection
        await collection.insertOne(parsedData); // Correct usage
        console.log("Data inserted into collection");

        const response = NextResponse.json({ message: "Data saved successfully!" });
        response.headers.append('Access-Control-Allow-Origin', '*');
        response.headers.append('Access-Control-Allow-Methods', 'POST, OPTIONS');
        response.headers.append('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        return response;

    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    } finally {
        await client.close();
        console.log("Closed MongoDB connection");
    }
}


export async function OPTIONS() {
    const response = NextResponse.json({}, { status: 200 });
    response.headers.append('Access-Control-Allow-Origin', '*');
    response.headers.append('Access-Control-Allow-Methods', 'POST, OPTIONS');
    response.headers.append('Access-Control-Allow-Headers', 'Content-Type, Authorization, data');
    return response;
}