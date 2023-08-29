'use client'

import { useRef, useState, useEffect } from 'react';

export default function Home() {
  const today = new Date().toISOString().split("T")[0];
  const [rover, setRover] = useState('curiosity');
  const [date, setDate] = useState(today);
  const [camera, setCamera] = useState('Todas');
  const [photos, setPhotos] = useState([{ id: '', img_src: '' }]);
  const [isLoading, setIsLoading] = useState(false);
  const [userConfig, setUserConfig] = useState({ configs: [{ rover: '', earth_date: '', camera: '' }] });
  const roverRef = useRef(null);
  const dateRef = useRef(null);
  const camRef = useRef(null);

  const handleRover = () => {
    setRover(roverRef.current.value);
    handleSubmit();
  }

  const handleDate = () => {
    setDate(dateRef.current.value);
    handleSubmit();
  }

  const handleCam = () => {
    setCamera(camRef.current.value);
    handleSubmit();
  }

  const handleSubmit = async (e?: React.SyntheticEvent) => {
    e?.preventDefault();
    setIsLoading(true);
    const response = await fetch(`/api/?rover=${roverRef.current.value}&earth_date=${dateRef.current.value}&camera=${camRef.current.value}`);
    const resultados: { photos: [] } = await response.json();
    setPhotos(resultados.photos);
    setIsLoading(false);
  }

  useEffect(() => {
    if (localStorage.getItem('searchConfigs') === null) {
      localStorage.setItem('searchConfigs', JSON.stringify({ configs: [{}] }));
    } else {
      const userConfigString = localStorage.getItem('searchConfigs');
      const userConfigObject = JSON.parse(userConfigString!);
      setUserConfig(userConfigObject);
      console.log(userConfigObject);
    }
  }, []);

  const saveConfig = () => {
    localStorage.setItem('searchConfigs', JSON.stringify({ ...userConfig, configs: [{ rover: rover, earth_date: date, camera: camera }] }));
  }

  return (
    <>
      <header className="flex flex-col items-center justify-between">
        <form onSubmit={handleSubmit}>
          <label htmlFor="rover">Seleccionar Rover:</label>
          <select name="rover" id="rover" ref={roverRef} onChange={handleRover} value={rover}>
            <option value="curiosity">Curiosity</option>
            <option value="opportunity">Opportunity</option>
            <option value="spirit">Spirit</option>
          </select>
          <label htmlFor="earth_date">Seleccionar fecha:</label>
          <input type="date" id="earth_date" name="earth_date" ref={dateRef} onChange={handleDate} value={date} max={today} />
          <label htmlFor="camera">Seleccionar camara:</label>
          <select name="camera" id="camera" ref={camRef} onChange={handleCam} value={camera}>
            <option value="">Todas</option>
            <option value="FHAZ">FHAZ</option>
            <option value="NAVCAM">NAVCAM</option>
            <option value="MAST">MAST</option>
            <option value="CHEMCAM">CHEMCAM</option>
            <option value="MAHLI">MAHLI</option>
            <option value="MARDI">MARDI</option>
            <option value="RHAZ">RHAZ</option>
          </select><br></br>
        </form>
        <select>
          {userConfig.configs.map(config =>
            <option
              key={`${config.rover} ${config.earth_date} ${config.camera}`}
            >
              {`${config.rover} ${config.earth_date} ${config.camera}`}
            </option>
          )}
        </select>
        <button onClick={saveConfig} className="p-2">Guardar búsqueda</button>
      </header>
      <main className="flex flex-col items-center justify-between results">
        {isLoading ? <h1>Cargando</h1> : null}
        {photos[0]?.img_src?.length > 0 && !isLoading ?
          <><h1>Resultados</h1>{photos.slice(0, 25).map(photo => <img key={photo.id} src={photo.img_src}></img>)}</>
          :
          isLoading ? null : <h1>No hay resultados</h1>
        }
      </main>
    </>
  )
}