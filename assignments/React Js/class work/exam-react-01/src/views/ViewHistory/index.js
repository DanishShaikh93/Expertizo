import logo from '../../images/logo.webp';
// LocalStoragePage.js
import React, { useState, useEffect } from 'react';

function LocalStoragePage() {
    const [searchRecords, setSearchRecords] = useState([]);

    useEffect(() => {
        const records = JSON.parse(localStorage.getItem('searchRecords')) || [];
        setSearchRecords(records);
    }, []);

    return (
        <>
        <div className="search-sec detail">
            <img src={logo} height="100" alt="Logo"/> <br/>
                <h1>Weather App</h1>
                </div>
        <div className="local-storage-page">
            
            <h2>Search Records from Local Storage</h2>
            <ul>
                {searchRecords.map((record, index) => (
                    <li key={index}>
                        <strong> Seacrhed For:</strong> {record.searchQuery}, <strong>Temperature:</strong> {record.weatherData.main.temp}
                    </li>
                ))}
            </ul>
        </div>
        </>
    );
}

export default LocalStoragePage;
