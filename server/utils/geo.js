import config from '../config.js';
import node_geocoder from 'node-geocoder';

// geocoder related
const options = {
  provider: config.geocoding_provider,

  // Optional depending on the providers
  apiKey: config.api_key, // for Mapquest, OpenCage, Google Premier
  formatter: null // 'gpx', 'string', ...
};

export const geocoder = node_geocoder(options);

// distance related

const RADIUS_IN_KM = 6371;

export const distance = (p1, p2) => {

  // degrees to radians
  let lon1 = p1[0] * Math.PI / 180;
  let lon2 = p2[0] * Math.PI / 180;
  let lat1 = p1[1] * Math.PI / 180;
  let lat2 = p2[1] * Math.PI / 180;

  // Haversine formula
  let dlon = lon2 - lon1;
  let dlat = lat2 - lat1;
  let a = Math.pow(Math.sin(dlat / 2), 2)
            + Math.cos(lat1) * Math.cos(lat2)
            * Math.pow(Math.sin(dlon / 2),2);
          
  let c = 2 * Math.asin(Math.sqrt(a));

  // calculate the result and round 
  return(c * RADIUS_IN_KM).toFixed(3);
}

export const kmToRadius = (km) => (km / RADIUS_IN_KM)

