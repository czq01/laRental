import mongoose from "mongoose";
import Post from "../models/Post.js";
import House from "../models/House.js"
import User from "../models/User.js"
import { geocoder, kmToRadius } from "../utils/geo.js";

// @desc    Publish a post
// @route   POST /post
// @access  Private
const createPost = async (req, res) => {
    const { type, house_id, requirements, desc } = req.body;
    const createdBy = req.user._id;

    // Use transaction
    const session = await mongoose.startSession()
    session.startTransaction()

    try {
        // Find and update attached house
        const house = await House.findById(house_id)
        if (!house) throw Error("House not exists.")

        // Create post
        const post = (await Post.create([{
            type,
            house,
            requirements,
            desc,
            createdBy,
        }], {session}))[0];
        if (!post) throw Error('Invalid post data')

        // Update house
        house.posts.push(post._id)
        await house.save({ validateBeforeSave: false, session })

        // Update author
        const user = await User.findById(createdBy)
        user.posts.push(post._id)
        await user.save({ validateBeforeSave: false, session })

        await session.commitTransaction()

        res.status(201).send({
            success: true,
            post,
        })
    } catch (error) {

        await session.abortTransaction();

        res.status(401).send({
            success: false,
            message: error.message
        })
    } finally {
        await session.endSession()
    }
}

// @desc    find posts by location and pagination
// @route   GET /post
// @access  Public
const getPostBySearch = async (req, res) => {

    const { addr, distRange, page, limit } = req.query;

    try {
        const loc = await geocoder.geocode(addr);

        var aggregate =  Post.aggregate([
            {
                $lookup: {
                    from: 'houses',
                    localField: 'house',
                    foreignField: '_id',
                    pipeline: [
                        {
                            $match: {
                                location: {
                                    $geoWithin: {
                                        $centerSphere: [
                                            [loc[0].longitude, loc[0].latitude],
                                            kmToRadius(distRange)
                                        ]
                                    }
                                },
                            }
                        },
                    ],
                    
                    as: 'house_detail'
                }
            },
            {
                $match: {
                    "house_detail": {$ne: []}
                }
            }
        ])

        const options = {
            page,
            limit,
            sort: '-createdAt'
        }

        const posts = await Post.aggregatePaginate(aggregate, options)

        res.status(200).send({
            success: true,
            count: posts.totalDocs,
            totalPages: posts.totalPages,
            requestedAddr: loc[0].formattedAddress,
            posts: posts.docs
        });

    } catch (error) {
        res.status(400).send({
            success: false,
            message: error.message
        });
    }

}


export {
    createPost,
    getPostBySearch,
};