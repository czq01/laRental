import mongoose from "mongoose";
import mongoose_delete from 'mongoose-delete'
import aggregatePaginate from 'mongoose-aggregate-paginate-v2'

const PostSchema = mongoose.Schema({
    type: {
        type: 'String',
        enum: ['transfer', 'roommate']
    },
    desc: {
        type: 'String'
    },
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
    confirmed: {
        type: Number,
    },
    complete: {
        type: mongoose.Schema.Types.Boolean,
        default: false
    },

    // Relationships
    // Hosue resource attached to this post
    house: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'House',
        require: [true, "Please attach a house resource"]
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    requestedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Request'
    }],
}, { timestamps: true });

// Add soft delete plugin
PostSchema.plugin(mongoose_delete, { overrideMethods: 'all' })

// Add pagination plugin
PostSchema.plugin(aggregatePaginate)

PostSchema.query.findByGender = function(gender) {
    return this.find({
        "requirements.people": {
            "$in" : [gender, 'none']
        }
    });
}

export default mongoose.model("Post", PostSchema);