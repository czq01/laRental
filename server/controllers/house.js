import House from '../models/House.js'
import geocoder from '../utils/geocoder.js';


// Method: POST
// API: /house
// add a new rental house resource
const addHouse = async (req, res, next) => {
    try {
        const house = await House.create(req.body);
        res.send(house);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

// Method: GET
// API: /house?addr={}&distRange={}&priceRange={}&amenities={}
// Search house
const getHouseBySearch = async (req, res, next) => {

    // prepare search params
    const { addr, distRange } = req.query;
    const priceRange = req.query.priceRange.split(',').map((p) => (parseFloat(p)));
    const amenities = req.query.amenities.split(',');
    console.log(amenities)
    try {
        // geocode requested address
        const loc = await geocoder.geocode(addr);

        // query
        const houses = await House.find().findBySearch(
            [loc[0].longitude, loc[0].latitude],    // coords
            distRange,  // meters
            priceRange, // priceRange
            amenities   // amenities
        )

        res.status(200).send({
            success: true,
            count: houses.length,
            data: houses
        })

    } catch (error) {
        res.status(400).send(error.message);
    }
}

export { addHouse, getHouseBySearch };



// const getAllHouses = async (req, res, next) => {
//     try {
//         const q = query(
//             collection(db, config.collection),
//             limit(5)
//         );
//         const data = await getDocs(q);
//         res.send(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// }

// const getHouseByAmenities = async (req, res, next) => {
//     const amenities = req.params.amenities.split(',');

//     try {
//         const q = query(
//             collection(db, config.collection),
//             where("amenities", "array-contains", amenities[0]));
        
//         const data = await getDocs(q);
//         var temp = data.docs.map((doc) => doc.data());
//         for (let i = 1; i < amenities.length; i++) {
//             temp = temp.filter((house) => house.amenities.includes(amenities[i]));
//         }
//         res.send(temp)
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// }
