import React, { useState } from 'react'
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete'
import '@geoapify/geocoder-autocomplete/styles/minimal.css'
import MapComponent from '../../Component/MapComponent'

 
const SearchLocation = () => {

    const type = 'city'; // Example value, you can adjust as needed
    const language = 'en'; // Example value, you can adjust as needed
    const position = { lat: 0, lon: 0 }; // Example value, you can adjust as needed
    const countryCodes = ['US']; // Example value, you can adjust as needed
    const limit = 5; // Example value, you can adjust as needed
    // const displayValue = true; // Example value, you can adjust as needed
  

 
    const [location, setLocation] = useState({ lat: 0, lon: 0 }); // Default location, adjust as needed

    function onPlaceSelect(value) {
        setLocation({ lat: value.lat, lon: value.lon }); // Update the location state
    }


  function onSuggectionChange(value) {
    console.log(value);
  }
 
  return (
  <>
  <GeoapifyContext apiKey="e93d164ef5474ea28c6631add2ad7117">
      <GeoapifyGeocoderAutocomplete placeholder="Enter address here"
        type={type}
        lang={language}
        position={position}
        countryCodes={countryCodes}
        limit={limit}
        // value={displayValue}
        placeSelect={onPlaceSelect}
        suggestionsChange={onSuggectionChange}
        />
    </GeoapifyContext>

<MapComponent location={location} />
</>
)
}
 
export default SearchLocation