import { useState } from 'react'
import './App.css'

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [temp, setTemp] = useState(null);
  const [error, setError] = useState('');
  const [wind, setwind] = useState('');
  const [cityname, setcityname] = useState('');      
  const [datetime, setDatetime] = useState('');
  const [coord, setcoord] = useState('')
  const [coord2, setcoord2] = useState('')
  const [sys, setsys] = useState('')
  const apiKey = 'https://67b5f2ba39d8c810d0a5c2eb--keen-crumble-846a16.netlify.app/';
  console.log(city);
  const handleChange = (e) => setCity(e.target.value);
  const getWeather = async () => {
    if (!city) return

    setError('Please enter city.');
    setError('');
    const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=e7c3f78c726ad426f9c625c8e89326e7`
    try {
      const res = await fetch(url);
      console.log({ res });
      const data = await res.json();
      console.log({ data });     
      if (data.cod === 404) {
        setError('city not found');
        setWeather('null');
      } else {
        setTemp(data.main.temp);
        setWeather(data.weather[0]);
        setwind(data.wind);
        setcityname(data.name);
        console.log(weather);
        const now = new Date();
        const formattedDateTime = now.toLocaleString();
        setDatetime(formattedDateTime);
        setcoord(data.coord)
        setcoord2(data.coord)
        setsys(data.sys.country)
      }
    }
    catch {
      setError("failed to fetch data");
    }
  }
  return (
    <>
      <div className='main-div'>
        <div className='form'>
          <h2>Weather App</h2>
          <input type="text" value={city} onChange={handleChange} placeholder='Enter City name ' x/>

          
          <br></br>
          <button onClick={getWeather}>Get Weather</button>
        <h2> {sys} </h2>
          {error && <p>{error}</p>}
          {datetime && <p>{datetime}</p>}
          <h2>{cityname}</h2>
          {temp && <p>{temp} °C</p>}
          {/* {coord2?.lon && <p>longitude  : {coord2?.lon} </p>} */}
          {/* {coord?.lat && <p>latitude  : {coord?.lat} </p>} */}
          <p>{weather?.main}</p>
          {wind?.speed && <p>wind speed : {wind?.speed} m/s</p>}
        </div>
      </div> 
    </>
  )
}

export default App
