export default async function RoverPhotos(req: { params: {}, searchParams: { rover: string, earth_date: string, camera: string } }) {

    console.log(req.searchParams);

    const request = req.searchParams;

    let response;

    if (request.camera === '') {
        response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${request.rover}/photos?earth_date=${request.earth_date}&api_key=mn0cL646A86fzVD3vI3MdMpphxncHeUDjNCzgPja`);
    }
    else {
        response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${request.rover}/photos?earth_date=${request.earth_date}&camera=${request.camera}&api_key=mn0cL646A86fzVD3vI3MdMpphxncHeUDjNCzgPja`);
    }
    const resultados: {
        photos: {
            img_src: string;
        }[]
    } = await response.json();

    console.log(resultados);

    return (
        <div className="results">
            {resultados.photos.length > 0 ? resultados.photos.slice(0, 25).map(photo => (
                <img src={photo.img_src} alt={`Mars Rover - ${request.rover}`} />
            ))
                :
                'No se encontraron resultados'}
        </div>
    )
}