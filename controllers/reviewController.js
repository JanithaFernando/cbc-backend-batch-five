import Review from "../models/review.js";
import Order from "../models/order.js";

export async function createReview(req,res){
    if(req.user==null){
        res.status(403).json({
            message:"Please login and try again"
        })
        return
    }

    const checkOrdered=await Order.findOne({email:req.body.email})
    if(checkOrdered==null){
        res.status(404).json({
            message:"You did not order items"
        })
        return
    }
    
    const reviewInfo=req.body

    if(reviewInfo.name==null){
        reviewInfo.name=req.user.firstName+" "+req.user.lastName

    }
   
    const comment=[]

    for(let i=0;i<reviewInfo.comment.length;i++){
        comment[i]={
            commentInfo:{
                productId:reviewInfo.comment[i].productId,
                commentText:reviewInfo.comment[i].commentText,
            }
        }
    }

    try{
        const review=new Review({
            name:reviewInfo.name,
            email:reviewInfo.email,
            comment:comment,
            rating:reviewInfo.rating,
            images:reviewInfo.images,

        })
        const createReview=await review.save()
        res.json({
            message:"review created successfullly",
            review:createReview
        })
    }catch(err){
        res.status(500).json({
            message:"Failed to create review",
            error:err
        })
    }

}

export async function getReviews(req,res){
    const productId=req.body.productId
    try{
        
        const review=await Review.find({"comment.commentInfo.productId":productId})
        res.json({
            message:review.comment.commentInfo.commentText
        })
        

    }catch(err){
        res.json({
            message:"Failed to get reviews",
            error:err
        })
    }
}

