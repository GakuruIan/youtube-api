const mongoose = require('mongoose')


const MembershipSchema = mongoose.Schema({
    channel:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Channel',
        require:true
    },
    plan:{
        type:String,
        enum:['Basic','Standard','Premium'],
        default:'Basic'
    },
    price:{
        type:Number,
        default:0
    },
    duration:{
        type:String,
        required:true
    },
    membershipStatus:{
      type:String,
      enum:['active','canceled','expired'],
      default:'active'
    },
    stripeCustomerId:{
     type:String,
     required:true
    },
    stripeSubscriptionId:{
       type:String,  // for recurring payments
       required:true
    },
    expires:{
        type:Date,
        required:true
    },
    paymentHistory:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Payment'
        }
    ]
},{timestamp:true})

module.exports = mongoose.model('Membership',MembershipSchema)