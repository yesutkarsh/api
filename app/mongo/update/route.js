import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { headers } from "next/headers";

export async function GET() {


  const header = headers();


  const orderid = header.get('orderid')
  const status = header.get('status')
  console.log(orderid,status)

  const client = new MongoClient(process.env.MONGODB_URI);
  console.log(process.env.MONGODB_URI)

  try {
    await client.connect();

    // Choose a name for your database
    const database = client.db("ecommers-user-data");

    // Choose a name for your collection
    const collection = database.collection("ecommerce-users");



     // Update the document
     await collection.updateOne(
        { orderid: orderid}, // Filter
        { $set: { status:status} } // Update
      );
  
      // Retrieve the updated document
      const updatedDocument = await collection.findOne({
        orderid: orderid
      });

    return NextResponse.json(updatedDocument, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
  } finally {
    await client.close();
  }
}



export async function OPTIONS() {
  const response = NextResponse.json({}, { status: 200 });
  response.headers.append('Access-Control-Allow-Origin', '*');
  response.headers.append('Access-Control-Allow-Methods', 'GET, OPTIONS');
  response.headers.append('Access-Control-Allow-Headers', 'Content-Type, Authorization, key, orderid, status');
  return response;
}