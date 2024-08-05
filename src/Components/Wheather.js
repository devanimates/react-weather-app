import React, { useState } from 'react'
import './Wheather.css'
import { FaSearch } from "react-icons/fa";
import {MdLocationOn} from 'react-icons/md'
import { FaWind } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";

const Wheather=()=>{
    
    const [city,setCity]=useState('');
    const [weather,setWheather]=useState();
    const [error,setError]=useState('');
    const API_KEY='124348259ab00bb8765da5e9864a1f5f';

    // const url='https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}';
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    function handleOnChange(event){
        setCity(event.target.value);
        console.log(event.target.value);
    }

    async function fetchdata(){
        try{


            let response=await fetch(url);
            let output=await response.json();
            setWheather(output);

            if(response.ok){
                setWheather(output);
                setError('');
                console.log(output);
            }
            else{
                setError('no data found please enter a valid city');
            }

        }
        catch(error){

        }
    }

    return(


        <div className='container'>
            <div className='city'>
            <input type='text' placeholder='Enter City' value={city} onChange={handleOnChange}/>
            <button onClick={()=>fetchdata()} ><FaSearch color='blue' size={27}/></button>
            </div>

            {

            error? <p className='error-message'>{error}</p>:null
        }

        {
            weather&& weather.weather &&
            <div className='content'>

                <div className='weather-image'>
                <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt=''></img>
                <h3 className='weather-description'> {weather.weather[0].description}</h3>

                <div className='temperature'>
                <h1 > {weather.main.temp} <span>&deg;C</span></h1>

                    </div>

                <div className='weather-city'>

                    <div className='location'>
                    <MdLocationOn/>

                        </div>
                        <p> {weather.name}, <span>{weather.sys.country} </span></p>
                    </div>

            <div className='weather-stats'>

                <div className='wind'>

                    <div className='wind-icon'>
                    <FaWind />
                    </div>
                    <h2 className='wind-speed'>{weather.wind.speed} <span>Km/h</span></h2>
                    <h3 className='wind-heading'>Wind Speed</h3>
                    
                    </div>

                <div className='humidity'>
                <div className='humidity-icon'>
                <WiHumidity />
                    </div>

                <h2 className='humidity-percent'> {weather.main.humidity} <span>%</span></h2>
                <h3 className='humidity-heading'>humidity</h3>
                    </div>
                </div>

                </div>

                </div>
        }

        </div>

       
    );
}

export default Wheather;
