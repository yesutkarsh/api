
import { NextResponse } from "next/server";
import data from "../../../data/data"


export async function GET(request, { params }) {


        const { id } = params;
        console.log(id)

        const res = data.filter((product)=>{
            return product.productId == id
        })
        return NextResponse.json(res)
}