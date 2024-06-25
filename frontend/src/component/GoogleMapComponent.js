import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MapComponent() {
    const [locations, setLocations] = useState([]);
    const [newLocations, setNewLocations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseLocations = await axios.get('http://localhost:8080/google-map/locations');
                setLocations(responseLocations.data);
            } catch (error) {
                console.error('Error fetching locations:', error);
            }

            try {
                const responseNewLocations = await axios.get('http://localhost:8080/google-map/new-locations');
                setNewLocations(responseNewLocations.data);
            } catch (error) {
                console.error('Error fetching new locations:', error);
            }

            setLoading(false);
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (!loading) {
            const loadGoogleMaps = async () => {
                const googleMapsScript = document.createElement('script');
                googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA3-krfkPOcp41P5X-S8mko1hBXD53HC6A&callback=initMap&libraries=geometry`;
                googleMapsScript.async = true;
                googleMapsScript.defer = true;
                window.initMap = initMap;
                document.head.appendChild(googleMapsScript);
            };

            loadGoogleMaps();
        }
    }, [loading]);

    function initMap() {
        const map = new window.google.maps.Map(document.getElementById('map'), {
            center: { lat: 12.9716, lng: 77.5946 },
            zoom: 11
        });

        
        locations.forEach(location => {
            const circle = new window.google.maps.Circle({
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35,
                center: { lat: location.latitude, lng: location.longitude },
                radius: 3000,
                map: map
            });

            addInfoWindow(circle, location.name);

            const marker = new window.google.maps.Marker({
                position: { lat: location.latitude, lng: location.longitude },
                map: map,
                title: location.name
            });

            addInfoWindow(marker, location.name);
        });
    }

    function addInfoWindow(markerOrCircle, content) {
        const infowindow = new window.google.maps.InfoWindow({
            content: content
        });

        markerOrCircle.addListener('mouseover', () => {
            infowindow.open(markerOrCircle.getMap(), markerOrCircle);
        });

        markerOrCircle.addListener('mouseout', () => {
            infowindow.close();
        });
    }

    function handleCheckButtonClick() {
        let result = "";
        newLocations.forEach(newLocation => {
            let present = false;
            locations.forEach(existingLocation => {
                const distance = window.google.maps.geometry.spherical.computeDistanceBetween(
                    new window.google.maps.LatLng(newLocation.latitude, newLocation.longitude),
                    new window.google.maps.LatLng(existingLocation.latitude, existingLocation.longitude)
                );
                if (distance <= 3000) {
                    present = true;
                    result += `Coordinate (${newLocation.latitude}, ${newLocation.longitude}) is present in the circumference of ${existingLocation.name}.\n`;
                }
            });
            if (!present) {
                result += `Coordinate (${newLocation.latitude}, ${newLocation.longitude}) is not present in the circumference of any existing location.\n`;
            }
        });
        alert(result);
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div id="map" style={{ height: '600px', width: '100%', marginBottom: '20px' }}></div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button onClick={handleCheckButtonClick} style={{ padding: '10px 20px', fontSize: '16px', borderRadius: '5px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>Check</button>
            </div>
        </div>
    );
}

export default MapComponent;
