import mongoose from "mongoose";
import mongoose_delete from "mongoose-delete"

const RequestSchema = new mongoose.Schema({
  // Basic
  status: {
    type: String,
    enum: ["accepted", "rejected", "undecided"],
    default: "undecided"
  },
  desc: {
    type: String,
    maxlength: 200,
  },
  // Relationships
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: [true, "Please add the request sender."]
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: [true, "Please add the post."]
  }
}, {timestamps: true})

// Add soft delete plugin
RequestSchema.plugin(mongoose_delete)


export default mongoose.model("Request", RequestSchema);