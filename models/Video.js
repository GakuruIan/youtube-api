const mongoose = require("mongoose");

const VideoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  videoUrl: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
  },
  privacy: {
    type: String,
    enum: ["public", "private", "kids"],
    default: "public",
  },
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  },
  views: {
    type: Number,
    default: 0,
  },
  channel_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Channel",
    required: true,
  },
  comments: [
    {
      user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      comment: { type: String },
      postedAt: { type: Date, default: Date.now },
    },
  ],
  tags: [
    {
      type: String,
    },
  ],
  duration:{
    type: Number 
  }
},{timestamp:true});


module.exports = mongoose.model('Video',VideoSchema)