const mongoose = require('mongoose')

const Playlist = mongoose.Schema({
    name:{
        type:String,
        unique:true
    },
    videos:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Video',
            required:true
        }
    ],
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },

},{timestamp:true})


module.exports= mongoose.model('Playlist',Playlist)