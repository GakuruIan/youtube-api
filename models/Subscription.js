const mongoose = require('mongoose')

const SubSchema = mongoose.Schema({
    channel:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Channel',
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    membership:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Membership',
    }
})

module.exports = mongoose.model('Subscription',SubSchema)