import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

export default async function RoverPhotos(
    req: { params: {}, searchParams: { rover: string, earth_date: string, camera: string } }
) {

    console.log(req.searchParams);

    const request = req.searchParams;

    let response;

    if (request.camera === '') {
        response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${request.rover}/photos?earth_date=${request.earth_date}&api_key=mn0cL646A86fzVD3vI3MdMpphxncHeUDjNCzgPja`);
    }
    else {
        response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${request.rover}/photos?earth_date=${request.earth_date}&camera=${request.camera}&api_key=mn0cL646A86fzVD3vI3MdMpphxncHeUDjNCzgPja`);
    }
 /*   const resultados: {
        photos: {
            id: string;
            img_src: string;
        }[]
    } = await response.json();*/

    const resultados = await response.json();
    console.log(resultados);
    return NextResponse.json({resultados});
//    return JSON.stringify(resultados);
}