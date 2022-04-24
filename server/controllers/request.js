import mongoose from "mongoose";
import Post from "../models/Post.js";
import Request from "../models/Request.js";
import User from "../models/User.js";

// @desc    Create a request
// @route   POST /request
// @access  Private
const createRequest = async (req, res) => {

  const session = await mongoose.startSession()
  session.startTransaction()
  
  try {
    const { post_id, desc } = req.body
    const post = await Post.findById(post_id)
    if (!post) throw Error("Post not exists.")

    if (post.createdBy.equals(req.user._id)) throw Error("You are the author of this post.")

    const sender = await User.findById(req.user._id)
    if(!sender) throw Error("User not exists.")
    // Check whether current user has requested for this post
    sender.requests.forEach(request => {
      if (request.post_id.equals(post._id)) throw Error("You have requested for this post")
    });

    // Create the request
    const request = (await Request.create([{
      desc, 
      post: post._id,
      sender: sender._id
    }], {session}))[0]
    if (!request) throw Error("Error in create new request")

    // update sender request list
    sender.requests.push({
      request: request._id,
      post_id: post._id,
    })
    await sender.save({ validateBeforeSave: false, session })

    // update post request list
    post.requestedBy.push(request._id)
    await post.save({ validateBeforeSave: false, session })

    await session.commitTransaction()

    res.status(200).send({
      success: true,
      request,
    })
  } catch (error) {

    await session.abortTransaction();
    
    res.status(400).send({
      success: false,
      message: error.message,
    })
  } finally {
    await session.endSession()
  }
}


// @desc    Get request by id
// @route   GET /request/:request_id
// @access  Public
const getRequestById = async (req, res) => {
  try {
    const request = await Request.findById(req.params.request_id)
    if (!request) throw Error("Requset not exits.")

    res.status(200).send({
      success: true,
      request,
    })
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    })
  }
}

// @Desc    Get requests by request ids
// @Route   GET /request/ids?reqeust_ids=id1,id2
// @Access  Public
const getRequestsByIds = async (req, res) => {
  const { request_ids } = req.query
  const ids = request_ids.split(',')
  try {
      const populate_field = 'name email age gender occupation desc'
      const requests = await Request.find({
          '_id': { $in: ids.map((id) => (mongoose.Types.ObjectId(id))) }
      }).populate('sender', populate_field)

      res.status(200).send({
          success: true,
          requests
      })
  } catch (error) {
      res.status(400).send({
          succes: false,
          message: error.message
      });
  }
}

// @desc    Post author handle request
// @route   PUT /request/:request_id
// @access  Private
const handleRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.request_id)
    if (!request) throw Error("Request not exists.")

    // Find the post
    const post = await Post.findById(request.post)
    if (!post) throw Error("This post is deleted.")

    // Check if the current user is the author
    const user = await User.findById(req.user._id)
    if (!user._id.equals(post.createdBy)) throw Error("You are not the author.")

    // update status
    if (!req.body.status) throw Error("Illegal operation on request")
    request.status = req.body.status
    await request.save({ validateBeforeSave: false })

    res.status(200).send({
      success: true,
      data: request,
    })

  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    })
  }
}

// @desc    The sender withdraw the reqeust
// @route   DELETE request/:request_id
// @access  Private
const deleteRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.request_id)
    if (!request) throw Error("Request not exists.")

    // Check if the current user is the sender of this request
    const user = await User.findById(req.user._id)
    if (!user._id.equals(request.sender)) throw Error("You are not the sender.")

    // Delete
    await request.save(function() {
      request.delete()
    })

    res.status(200).send({
      success: true,
      data: request._id
    })
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    })
  }
}


export {
  createRequest,
  getRequestById,
  getRequestsByIds,
  handleRequest,
  deleteRequest,
}