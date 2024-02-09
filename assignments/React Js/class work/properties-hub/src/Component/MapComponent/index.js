import React from 'react';
import { GeoapifyMap, GeoapifyApiKey } from '@geoapify/react-map';

const MapComponent = ({ location }) => {
    return (
        <div style={{ height: '400px', width: '100%' }}>
            <GeoapifyApiKey apiKey="e93d164ef5474ea28c6631add2ad7117">
                <GeoapifyMap
                    apiKey="e93d164ef5474ea28c6631add2ad7117"
                    center={location} // Provide the location as the center
                    zoom={12} // Adjust the zoom level as needed
                />
            </GeoapifyApiKey>
        </div>
    );
};

export default MapComponent;
