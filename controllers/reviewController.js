import Review from "../models/review.js";

export async function createReview(req,res){

    try{
        const review=new Review({
            name:req.body.name,
            productId:req.body.productId,
            comment:req.body.comment,
            rating:req.body.rating,
            images:req.body.images,

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


