
import { NextResponse } from "next/server";
import data from "../../data/data"


export async function GET() {
        const res = data.filter((product)=>{
            return product.productId == 23
        })
        return NextResponse.json(res)
}