import Post from "../models/Post.js";
import House from "../models/House.js"
import geocoder from "../utils/geocoder.js";

// @desc    Publish a post
// @route   POST /post
// @access  Private
const createPost = async (req, res) => {
    const { type, house, requirements, desc} = req.body;
    const createdBy = req.user.id;
    const post = await Post.create({
        type,
        house,
        requirements,
        desc,
        createdBy,
    });

    if (post) {
        res.status(201).send({
            success: true,
            data: {
                _id: post.id,
                house: await House.findById(post.house),
                desc: post.desc,
                requirements: post.requirements
            }
        });
    } else {
        res.status(401).send({
            success: false,
            message: 'Invalid post data'
        })
    }
}

// @desc    find posts by location
// @route   GET /post
// @access  Public
const getPostBySearch = async (req, res) => {
    
    const { gender, addr, distRange } = req.query;

    try {
        const loc = await geocoder.geocode(addr);
        const posts = await Post
            .find()
            .findByGender(gender)
            .findByLocation(
                [loc[0].longitude, loc[0].latitude],
                distRange);

        const result = posts.filter((post) => (
            post.house !== null
        ))

        res.status(200).send({
            success: true,
            count: result.length,
            data: result
        });
        
    } catch (error) {
        res.status(400).send({
            success: false,
            message: error.message
        });
    }

}

// @desc    User becomes interested in post
// @route   UPDATE /post/like/:post_id
// @access  Private
const postInterest = async (req, res) => {

    try {
        const post = await Post.findById(req.params.post_id);

        if (post.createdBy == req.user.id) {
            // User can't be the post creater
            throw new Error('Cant like your own post')
        } else if (post.interestedBy.includes(req.user.id)) {
            // User can't repeately like a post
            throw new Error('You have liked this post') 
        } else {
            post.interestedBy.push(req.user.id);
            await post.save();
            res.status(200).send({
                success: true,
                data: post
            })
        }
    } catch (error) {
        res.status(200).send({
            success: false,
            message: error.message
        })
    }
    

    Post.findByIdAndUpdate(
        req.params.post_id,
        {
            "$push": {"interestedBy": req.user.id}
        }
    );
}

export { 
    createPost, 
    getPostBySearch, 
    postInterest 
};