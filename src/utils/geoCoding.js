// utils/geocoding.js

/**
 * Convert address string to coordinates using Google Geocoding API
 * @param {string} address - The address string to geocode
 * @returns {Promise<{latitude: number, longitude: number} | null>}
 */
export const getCoordinatesFromAddress = async (address) => {
  try {
    if (!process.env.REACT_APP_GOOGLE_MAPS_API_KEY) {
      throw new Error('Google Maps API key is not configured');
    }

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.status === 'OK' && data.results.length > 0) {
      const location = data.results[0].geometry.location;
      return {
        latitude: location.lat,
        longitude: location.lng
      };
    } else if (data.status === 'ZERO_RESULTS') {
      throw new Error('No results found for this address');
    } else if (data.status === 'OVER_QUERY_LIMIT') {
      throw new Error('Google Maps API quota exceeded');
    } else if (data.status === 'REQUEST_DENIED') {
      throw new Error('Google Maps API request denied. Check your API key.');
    } else if (data.status === 'INVALID_REQUEST') {
      throw new Error('Invalid request. Please check the address format.');
    } else {
      throw new Error(`Geocoding failed with status: ${data.status}`);
    }
  } catch (error) {
    console.error('Geocoding error:', error);
    throw error;
  }
};

/**
 * Convert coordinates to address using Google Reverse Geocoding API
 * @param {number} latitude 
 * @param {number} longitude 
 * @returns {Promise<string | null>}
 */
export const getAddressFromCoordinates = async (latitude, longitude) => {
  try {
    if (!process.env.REACT_APP_GOOGLE_MAPS_API_KEY) {
      throw new Error('Google Maps API key is not configured');
    }

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.status === 'OK' && data.results.length > 0) {
      return data.results[0].formatted_address;
    } else {
      throw new Error(`Reverse geocoding failed with status: ${data.status}`);
    }
  } catch (error) {
    console.error('Reverse geocoding error:', error);
    throw error;
  }
};

/**
 * Validate if coordinates are within valid ranges
 * @param {number} latitude 
 * @param {number} longitude 
 * @returns {boolean}
 */
export const validateCoordinates = (latitude, longitude) => {
  return (
    typeof latitude === 'number' &&
    typeof longitude === 'number' &&
    latitude >= -90 &&
    latitude <= 90 &&
    longitude >= -180 &&
    longitude <= 180
  );
};

/**
 * Calculate distance between two coordinates (in kilometers)
 * @param {number} lat1 
 * @param {number} lon1 
 * @param {number} lat2 
 * @param {number} lon2 
 * @returns {number} Distance in kilometers
 */
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const d = R * c; // Distance in kilometers
  return Math.round(d * 100) / 100; // Round to 2 decimal places
};