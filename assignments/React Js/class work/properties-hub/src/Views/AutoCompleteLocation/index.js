// src/AutocompleteLocationField.js
import React, { useState } from 'react';

const AutocompleteLocationField = () => {
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const apiKey = 'e93d164ef5474ea28c6631add2ad7117'; // Replace 'YOUR_API_KEY' with your actual Geoapify API key

    const handleChange = async (event) => {
        const value = event.target.value;
        setInputValue(value); // Set the input value without encoding
    
        try {
            const encodedValue = encodeURIComponent(value); // Encode the value for the API request
            const response = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${encodedValue}&apiKey=${apiKey}`);
            const data = await response.json();
            const suggestionList = data.features.map(feature => feature.properties.formatted);
            setSuggestions(suggestionList);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    };
    


    

    const handleSelect = (selectedSuggestion) => {
        setInputValue(selectedSuggestion);
        setSuggestions([]);
    };

    return (
        <div>
            <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                placeholder="Enter a location"
            />
            <ul>
                {suggestions.map((suggestion, index) => (
                    <li key={index} onClick={() => handleSelect(suggestion)}>
                        {suggestion}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AutocompleteLocationField;
