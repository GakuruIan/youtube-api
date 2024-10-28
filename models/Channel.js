const mongoose = require('mongoose')


const ChannelSchema = mongoose.Schema({
     name:{
        type:String,
        required:true,
        unique:true
     },
     description:{
        type:String,
     },
     banner:{
        public_id: {
            type: String,
          },
          url: {
            type: String,
          },
          folder: {
            type: String,
          },
     },
     channel_image:{
        public_id: {
            type: String,
          },
          url: {
            type: String,
          },
          folder: {
            type: String,
          },
     },
     subscribers:{
        type:Number,
        default:0
     },
     views:{
        type:Number,
        default:0
     },
     socials:[
        {
            platform:String,
            link:String
        }
     ],
     linkedChannels:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Channel'
        }
     ],
     videos:[
        {
            type:Schema.Types.ObjectId,
            ref:'Video'
        }
     ]
},{timestamp:true})

module.exports = mongoose.model('Channel',ChannelSchema)