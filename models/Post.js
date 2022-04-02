import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
    type: {
        type: 'String',
        enum: ['transfer', 'roommate']
    },
    house: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'House'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    interestedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    requirements: {
        people: [{
            type: 'String',
            enum: ['none', 'male', 'female', 'other']
        }],
        comment: {
            type: 'String',
            maxLength: 120,
        }
    },
    desc: {
        type: 'String'
    },
    complete: {
        type: mongoose.Schema.Types.Boolean,
        default: false
    },
}, { timestamps: true });

PostSchema.query.findByLocation = function(coords, meters) {
    return this.populate({
        path: 'house',
        match: {
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
        },
        select: '-_id'
    });
}

PostSchema.query.findByGender = function(gender) {
    return this.find({
        "requirements.people": {
            "$in" : [gender, 'none']
        }
    });
}

export default mongoose.model("Post", PostSchema);