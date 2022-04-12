import config from '../config.js';
import node_geocoder from 'node-geocoder';

const options = {
  provider: config.geocoding_provider,

  // Optional depending on the providers
  apiKey: config.api_key, // for Mapquest, OpenCage, Google Premier
  formatter: null // 'gpx', 'string', ...
};

const geocoder = node_geocoder(options);

export default geocoder;

