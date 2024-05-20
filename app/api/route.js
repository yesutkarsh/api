// app/api/hello/route.js
import data from "./data";




export async function GET(request) {
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  