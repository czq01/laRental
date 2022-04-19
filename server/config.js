import dotenv from 'dotenv'
import assert from 'assert';

dotenv.config();

const {
    NODE_ENV,
    PORT,
    HOST,
    HOST_URL,
    MONGO_URL,
    GEOCODING_PROVIDER,
    API_KEY,
    JWT_SECRET,
    BCRYPT_SALT,
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
    node_env: NODE_ENV,
    port: PORT,
    host: HOST,
    url: HOST_URL,
    mongo_url: MONGO_URL,
    geocoding_provider: GEOCODING_PROVIDER,
    api_key: API_KEY,
    jwt_secret: JWT_SECRET,
    bcrypt_salt: BCRYPT_SALT,
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