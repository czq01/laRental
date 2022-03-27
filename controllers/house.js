import db from '../db.js';
import { collection, getDocs, addDoc, query, where } from "firebase/firestore"
import House from '../models/house.js';



const addHouse = async (req, res, next) => {
    try {
        const house = req.body;
        await addDoc(collection(db, 'houses'), house);
        res.send('Record saved successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllHouses = async (req, res, next) => {
    try {
        const data = await getDocs(collection(db, "houses"));
        res.send(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getHouseByAmenities = async (req, res, next) => {
    const amenities = req.params.amenities.split(',');

    try {
        const q = query(
            collection(db, 'houses'),
            where("amenities", "array-contains", amenities[0]));
        
        const data = await getDocs(q);
        var temp = data.docs.map((doc) => doc.data());
        for (let i = 1; i < amenities.length; i++) {
            temp = temp.filter((house) => house.amenities.includes(amenities[i]));
        }
        res.send(temp)
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export { addHouse, getAllHouses, getHouseByAmenities };