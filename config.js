import dotenv from 'dotenv'
import assert from 'assert';

dotenv.config();

const {
    PORT,
    HOST,
    HOST_URL,
    MONGO_URL,
    GEOCODING_PROVIDER,
    API_KEY,
    AUTH_DOMAIN,
    DATABASE_URL,
    PROJECT_ID,
    STORAGE_BUCKET,
    MESSAGING_SENDER_ID,
    APP_ID,
    MEASUREMENT_ID,
    COLLECTION
} = process.env;

assert(PORT, 'PORT is required');
assert(HOST, 'HOST is required');

const config = {
    port: PORT,
    host: HOST,
    url: HOST_URL,
    mongo_url: MONGO_URL,
    geocoding_provider: GEOCODING_PROVIDER,
    api_key: API_KEY,
    // firebaseConfig : {
    //     authDomain: AUTH_DOMAIN,
    //     databaseURL: DATABASE_URL,
    //     projectId: PROJECT_ID,
    //     storageBucket: STORAGE_BUCKET,
    //     messagingSenderId: MESSAGING_SENDER_ID,
    //     appId: APP_ID,
    //     measurementId: MEASUREMENT_ID
    // },
    collection: COLLECTION
}

export default config;