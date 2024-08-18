import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { headers } from "next/headers";

export async function GET() {


  const header = headers();



  const email = header.get('email')


  console.log(email)

  const client = new MongoClient(process.env.MONGODB_URI);
  console.log(process.env.MONGODB_URI)





  try {
    await client.connect();

    // Choose a name for your database
    const database = client.db("ecommers-user-data");

    // Choose a name for your collection
    const collection = database.collection("ecommerce-users");
    

    
      const allData = await collection.find({email :email}).toArray();
      return NextResponse.json(allData, { status: 200 });
   

  } catch (error) {
    return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
  } finally {
    await client.close();
  }

}




export async function OPTIONS() {
  const response = NextResponse.json({}, { status: 200 });
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, email');
  return response;
}