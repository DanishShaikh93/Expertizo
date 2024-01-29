import { useEffect, useState } from "react";
import logo from '../../images/logo.webp';
import { useNavigate } from "react-router-dom";

function Homepage() {
    const navigate = useNavigate()

    const apiKey = '8a13df165f9099bdd3008e66764b2a56';
    const [userSearch, setUserSearch] = useState('');
    const [result, setResult] = useState(null);

    

    const getApiData = () => {
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${userSearch},pakistan&units=metric&appid=${apiKey}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setResult(data); 
                saveToLocalStorage(userSearch, data); 
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                
            });
    };

    const userInput = (e) => {
        setUserSearch(e.target.value);
    };

    const saveToLocalStorage = (searchQuery, weatherData) => {

        // Retrieve existing search records from local storage
        const existingRecords = JSON.parse(localStorage.getItem('searchRecords')) || [];

        // Add new search record
        const newRecord = {
            searchQuery: searchQuery,
            weatherData: weatherData
        };

        // Update existing records with new record
        const updatedRecords = [...existingRecords, newRecord];

        // Save updated records to local storage
        localStorage.setItem('searchRecords', JSON.stringify(updatedRecords));
    };

    return (
        <>
        <div className='mainBg'>
        <div className='main'>
            <div className="search-sec">
                <img src={logo} height="100" alt="Logo"/> <br/>
                <h1>Weather App</h1>
                <p>You can check the weather-related information by simply typing the country or city name in the following field.</p>
                <input onChange={userInput} type="text" placeholder='Search here'/>
                <button onClick={getApiData}>Search</button>
                <p onClick={() => navigate(`/history`)} className="datahistory"><strong>View Histroy</strong></p>
            </div>

            <div className='userProfile-sec'>
                {result && (
                   
<div className="card" >
<div className="card-body">
  <h5 className="card-title">Country Weather Details</h5>
  <p><strong>Country Name:</strong> {result.name}</p>
  <p><strong>Current Temperature:</strong> {result.main.temp}</p>
                   <p><strong>Humidity: </strong>{result.main.humidity}</p>
                   <p><strong>Pressure:</strong> {result.main.pressure}</p>
                   <p><strong>Temperature Minimum:</strong> {result.main.temp_min}</p>
                   <p><strong>Temperature Maximum:</strong> {result.main.temp_max}</p>

</div>
</div>
                )}
            </div>



            </div>



            



            </div>
        </>
    );
}
export default Homepage