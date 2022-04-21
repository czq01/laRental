import House from '../models/House.js'
import Post from '../models/Post.js';
import User from '../models/User.js';
import { geocoder, distance, kmToRadius } from '../utils/geo.js';



// @Desc    add a new rental house resource
// @Route   POST /house
// @Access  Private
const addHouse = async (req, res) => {
    try {
        const house = await House.create(req.body);
        res.send(house);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

// @Desc    Search house by Address, Distance Range, Price Range,
//          Amenities, and pagination is used
// @Route   GET /house?addr={}&distRange={}&priceRange={}&amenities={}&page={}&limit={}
// @Access  Public
const getHouseBySearch = async (req, res) => {

    // prepare search params
    const { addr, distRange, page, limit, sortBy, asc } = req.query;
    const priceRange = req.query.priceRange.split(',').map((p) => (parseFloat(p)));
    const amenities = req.query.amenities.split(',');
    const asc_boolean = asc === 'true' ? true : false
    try {
        // geocode requested address
        const loc = await geocoder.geocode(addr);

        const query = {
            // location: {
            //     $geoWithin: {
            //         $centerSphere: [
            //             [loc[0].longitude, loc[0].latitude],
            //             kmToRadius(distRange)
            //         ]
            //     }
            // },
            price: {
                $gte: priceRange[0],
                $lte: priceRange[1],
            },
            amenities: {
                $all: amenities
            }
        }

        const aggregate = House.aggregate([
            {
                $geoNear: {
                    near: {
                        type: "point",
                        coordinates: [loc[0].longitude, loc[0].latitude],
                    },
                    maxDistance: Number(distRange),
                    distanceField: "dist",
                    query,
                    spherical: true
                }
            }
        ])

        const options = {
            page,
            limit,
            lean: true  // set this to allow adding extra fields
        } 

        if (sortBy) options.sort = `${asc_boolean ? '' : '-'}${sortBy}`

        const houses = await House.aggregatePaginate(aggregate, options)
        
        houses.docs.forEach(doc => {
            doc.dist = doc.dist.toFixed(1)
        });

        res.status(200).json({
            success: true,
            data: {
                count: houses.totalDocs,
                totalPages: houses.totalPages,
                requestedAddr: loc[0].formattedAddress,
                houses: houses.docs
            },
        })

    } catch (error) {
        res.status(400).send({
            message: error.message
        });
    }
}

// @Desc    Get houses by location
// @Route   GET /house/loc?addr={}&distRange={}
// @Access  Private
const getHousesByLoc = async (req, res) => {
    const {addr, distRange} = req.query
    try {
        // geocode requested address
        const loc = await geocoder.geocode(addr);

        const query = {
            location: {
                $geoWithin: {
                    $centerSphere: [
                        [loc[0].longitude, loc[0].latitude],
                        kmToRadius(distRange)
                    ]
                }
            },
        }

        const houses = await House.find(query).lean()
        const addrs = houses.map((house) => (
            {   
                _id: house._id,
                addr: house.location.formattedAddr,
            }
            
        ))

        res.status(200).send({
            success: true,
            addrs,
        })
    } catch (error) {
        res.status(400).send({
            succes: false,
            message: error.message
        });
    }
}

// @Desc    Get house by house id
// @route   GET /house/house_id
// @Access  Public
const getHouseById = async (req, res) => {
    const { house_id } = req.params
    try {
        const house = await House.findById(house_id)
        if (!house) throw Error("House not exist.")
        res.status(200).send({
            succes: true,
            house,
        })
    } catch (error) {
        res.status(400).send({
            succes: false,
            message: error.message
        });
    }
}

// @Desc    House attached by a post
// @Route   PUT /house/post/:house_id
// @Access  Private
const attachedByPost = async (req, res) => {
    const { house_id } = req.params
    const { post_id } = req.body
    try {
        const post = await Post.findById(post_id)
        // check if post exists
        if (post) {
            // Add post id to house's posts field 
            const house = await House.findByIdAndUpdate(
                house_id,
                { $push: { posts: post._id } }
            )

            res.status(200).send({
                success: true,
                data: house,
            })
        } else {
            throw Error("Post not exists.")
        }
    } catch (error) {
        res.status(400).send({
            succes: false,
            message: error.message
        });
    }
}

// @desc    Update users who like this house
// @route   PUT /house/likes/:house_id
// @access  Private
const updateHouseLikes = async (req, res) => {
    const { house_id } = req.params
    // get current login user
    const user_id = req.user._id
    try {
        const login_user = await User.findById(user_id)
        const house = await House.findById(house_id)

        if (!login_user || !house) throw Error("Invalid User or House data")

        if (!house.likes.includes(login_user._id)) {
            // User likes this house
            // Update house
            house.likes.push(login_user._id)
            await house.save({ validateBeforeSave: false })

            // Update user
            login_user.houses.push(house._id)
            await login_user.save({ validateBeforeSave: false })
        } else {
            // User unlikes this house
            // Update house
            house.likes.pull(login_user._id)
            await house.save({ validateBeforeSave: false })

            // Update user
            login_user.houses.pull(house._id)
            await login_user.save({ validateBeforeSave: false })
        }

        res.status(200).send({
            success: true,
            house,
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            message: error.message,
        })
    }
}

export {
    addHouse,
    getHouseBySearch,
    attachedByPost,
    updateHouseLikes,
    getHousesByLoc,
    getHouseById,
};