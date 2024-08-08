import { NextResponse } from "next/server";
import data from "./data/data"



export async function GET() {

    
        return NextResponse.json(data)
}