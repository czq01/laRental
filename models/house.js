import mongoose from "mongoose";
import geocoder from "../utils/geocoder.js";

const HouseSchema = new mongoose.Schema({
    rental_price: {
        type: Number,
        required: [true, 'Please add a price'],
    },
    location: {
        type: {
            type: String,
            enum: ['Point']
        },
        coordinates: {
            type: [Number],
        },
        formattedAddr: String
    },
    address: {
        type: String,
        required: [true, 'please add a address']
    },
    amenities: {
        type: [String]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

// Add index on location for later GeoJson query
HouseSchema.index({location: '2dsphere'});

// Add search query function
HouseSchema.query.findBySearch = function(coords, meters, pricesRange, amenities) {
    return this.find({
        location: {
            $nearSphere: {
                $geometry: {
                    type: "point",
                    coordinates: [
                        coords[0],
                        coords[1]
                    ]
                },
                $maxDistance: meters
            }
        },
        price: {
            $gte: pricesRange[0],
            $lse: pricesRange[1]
        },
        amenities: {
            $all: amenities
        }
    })
};

// Before save, geocode the address
HouseSchema.pre('save', async function(next) {
    const loc = await geocoder.geocode(this.address);
    this.location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddr: loc[0].formattedAddress
    }

    this.address = undefined;
    next();
});

export default mongoose.model("House", HouseSchema);




// class House {
//     constructor(rental_price, href, house_info, tages, 
//         addrline1, addrline2, amenities, highlights, pets_policy) {
//             this.rental_price = rental_price;
//             this.href = href;
//             this.house_info = house_info;
//             this.tages = tages;
//             this.addrline1 = addrline1;
//             this.addrline2 = addrline2;
//             this.amenities = amenities;
//             this.highlights = highlights;
//             this.pets_policy = pets_policy;
//         }
// }

// export default House;

