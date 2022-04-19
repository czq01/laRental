import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'
import aggregatePaginate from 'mongoose-aggregate-paginate-v2'
import { geocoder } from "../utils/geo.js";

const HouseSchema = new mongoose.Schema({
    // Basic Info
    price: {
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
    // Will be discarded, use location
    address: {
        type: String,
        required: [true, 'please add a address']
    },
    // e.g. 2b2b
    units: {
        type: [String]
    },
    // In squre foot
    size: {
        type: String
    },
    amenities: {
        type: [String]
    },
    highlights: {
        type: [String]
    },
    href: {
        type: [String]
    },

    // Relationships
    // Attached by posts
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    // Number of users who liked this house 
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]

}, { timestamps: true });

// Add index on location for later GeoJson query
HouseSchema.index({ location: '2dsphere' });

// Add pagination plugin
// HouseSchema.plugin(mongoosePaginate);
HouseSchema.plugin(aggregatePaginate)

// Before save, geocode the address
HouseSchema.pre('save', async function (next) {
    if (this.address) {
        const loc = await geocoder.geocode(this.address);
        this.location = {
            type: 'Point',
            coordinates: [loc[0].longitude, loc[0].latitude],
            formattedAddr: loc[0].formattedAddress
        }
        this.address = undefined;
    }
    next();
});

export default mongoose.model("House", HouseSchema);

// // Add search query function
// HouseSchema.query.findBySearch = function(coords, meters, pricesRange, amenities) {
//     return this.find({
//         location: {
//             $nearSphere: {
//                 $geometry: {
//                     type: "point",
//                     coordinates: [
//                         coords[0],
//                         coords[1]
//                     ]
//                 },
//                 $maxDistance: meters
//             }
//         },
//         price: {
//             $gte: pricesRange[0],
//             $lse: pricesRange[1]
//         },
//         amenities: {
//             $all: amenities
//         }
//     })
// };
