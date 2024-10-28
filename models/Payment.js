const mongoose = require('mongoose')


const PaymentSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    Membership:{
        typer:mongoose.Schema.Types.ObjectId,
        ref:'Membership',
        required:true
    },
    stripeCustomerId:{
        type:String,
        required:true
    },
    stripePaymentIntentId:{
        type:String // stripe payment ID for one-time payments
    },
    stripeSubscriptionId:{
        type:String  // stripe subscription Id for recurring payments
    },
    stripeInvoiceId:{
        type:String // stripe's invoice id for tracking payments
    },
    amount:{
        type:Number,
        required:true
    },
    currency:{
        type:String,
        default:'ksh'
    },
    paymentStatus:{
        type:String,
        enum:['pending','succeeded','failed','canceled','refunded'],
        default:'pending'
    },
    paymentDate:{
        type:Date,
        default:Date.now()
    },
    refundInfo:{
        refundId:{
            type:String
        },
        refundAmount:{
            type:Number
        },
        refundDate:{
            type:Date
        }
    }
},{timestamp:true})

module.exports = mongoose.model('Payment',PaymentSchema)