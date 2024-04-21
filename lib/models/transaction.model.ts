import {Schema, models, model} from "mongoose";

const TransactionSchema = new Schema({
    createdAt:{
        type: Date, 
        default: Date.now
    },
    stripeId:{
        type: String, 
        required: true, 
        unique: true
    },
    amount:{
        type: Number,
        require: true
    },
    plan: String,
    credits:Number,
    buyer:{ 
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

const TransactionModel = models?.Transaction || model("Transaction",TransactionSchema )

export default TransactionModel;