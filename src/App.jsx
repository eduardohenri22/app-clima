
import './App.css'
import { TiWeatherStormy } from 'react-icons/ti'
import {FiSearch} from 'react-icons/fi'
import { RiFahrenheitLine,RiCelsiusLine  } from 'react-icons/ri'
import {AiFillGithub } from 'react-icons/ai'
import { useState } from 'react'

function App() {
  const [city, setCity] = useState("")  
  const [weather, setWeather] = useState(null)

  const handleCity = (event) =>{
    setCity(event.target.value)
  }

  const handleSearch = () =>{
    fetch(`http://api.weatherapi.com/v1/current.json?key=adc016c9b0844e9fb73192053233103&q=${city}&lang=pt`)
    .then((res)=> {
      if(res.status == 200){
        return res.json()
      }
    })
    .then((data) =>{
      console.log(data)
      setWeather(data)
    })
  }

  return (  
    <>

    <div className='header'>

      <TiWeatherStormy className='logo'/>
      <h1 className='nameApp'>App Clima</h1>
 
    </div>

    <main className='container'>
        <div className='searchWeather'>
            <h2> Busque aqui o clima de qualquer cidade do Mundo!</h2>
          <div className='divInput'>
            <input 
            type="text" 
            placeholder='Buscar cidade' 
            value={city}
            onChange={handleCity}
            required
            />
            <button onClick={handleSearch}><FiSearch className='search'/></button>
          </div>
        </div>

        { weather ? (
            <div className='containerResult'>
              <div className='divResult'>
                <h1 className='h1City'>{weather.location.name}</h1>
                <img src={weather.current.condition.icon}/>
                <p>    {weather.location.localtime}</p>
              </div>

              <div className='description'>
                <h3>Céu: {weather.current.condition.text} </h3>
                <p>Temperaturas: {weather.current.temp_f}<RiFahrenheitLine className='weatherF'/>, {weather.current.temp_c}<RiCelsiusLine className='weatherC'/></p>
           
                <span className='spanState'>Estado: {weather.location.region}</span>
                <span className='country'>Pais: {weather.location.country}</span>
              </div>
          </div>
          ) : null}

          <div className='footer'>
            <h3>Develop: Eduardo Henrique </h3> 
            <AiFillGithub className='githubIcon' /><a className='link' href="https://github.com/eduardohenri22/app-clima">Repositório</a>
           
          </div>
    </main>
    </>
    


    
  )
}

export default App
