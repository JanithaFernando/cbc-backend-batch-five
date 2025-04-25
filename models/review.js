import mongoose from "mongoose";

const reviewSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    productId:{
        type:String,
        required:true
    },
    comment:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    images:[
        {type:String}
    ],
    date:{
        type:Date,
        default:Date.now
    }
    
})

const Review=mongoose.model("reviews",reviewSchema);

export default Review;