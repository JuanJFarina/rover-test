import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const rover = request.nextUrl.searchParams.get('rover');
    const earth_date = request.nextUrl.searchParams.get('earth_date');
    const camera = request.nextUrl.searchParams.get('camera');
    let response;
    if (camera === '') {
        response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?earth_date=${earth_date}&api_key=mn0cL646A86fzVD3vI3MdMpphxncHeUDjNCzgPja`);
    }
    else {
        response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?earth_date=${earth_date}&camera=${camera}&api_key=mn0cL646A86fzVD3vI3MdMpphxncHeUDjNCzgPja`);
    }
    const resultados = await response.json();
    return NextResponse.json(resultados);
}