import { NextResponse } from "next/server";
import data from "../../data/data"
export async function GET(request, { params }) {

   

    const { searchterm } = params;


    if (!searchterm) {
        return NextResponse.json({ error: 'Search term is required' }, { status: 400 });
    }

    const searchWords = searchterm.split(' ').map(word => word.toLowerCase());

    let result = searchWords.map(word => {
        return data.filter(product => {
            let product_search = product.search?.toLowerCase();
            return product_search?.includes(word);
        });
    });

    // Flatten the array of arrays and remove duplicates
    // result = [...new Set(result.flat())];

    // console.log(result); // Ensure this prints the correct filtered results
    return NextResponse.json(result);
}