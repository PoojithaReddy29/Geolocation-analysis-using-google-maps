
import axios from 'axios';

export async function fetchLocations() {
  try {
    const response = await axios.get('http://localhost:8080/google-map/locations');
    return response.data;
  } catch (error) {
    console.error('Error fetching locations:', error);
    throw error;
  }
}

export async function fetchNewLocations() {
  try {
    const response = await axios.get('http://localhost:8080/google-map/new-locations');
    return response.data;
  } catch (error) {
    console.error('Error fetching new locations:', error);
    throw error;
  }
}

export const loadGoogleMapsScript = () => {
    
    if (!window.google) {
        
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA3-krfkPOcp41P5X-S8mko1hBXD53HC6A&libraries=geometry`;
        script.async = true;
        script.defer = true;

        
        document.body.appendChild(script);

        
        return new Promise((resolve, reject) => {
            script.onload = resolve;
            script.onerror = reject;
        });
    } else {
        return Promise.resolve();
    }
};

