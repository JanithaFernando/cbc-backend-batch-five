import express from 'express'; 
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import productRouter from './routes/productRouter.js';
import userRouter from './routes/userRouter.js';
import jwt from 'jsonwebtoken';
import orderRouter from './routes/orderRouter.js';
import reviewRouter from './routes/reviewRouter.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config()
const app=express();

app.use(cors())
app.use(bodyParser.json());


app.use((req,res,next)=>{
    const tokenString=req.header("Authorization") 
    if (tokenString != null){
        const token=tokenString.replace("Bearer ","")
      //  console.log(token)

        jwt.verify(token,process.env.JWT_KEY,
            (err,decoded)=>{
                if(decoded!=null){
                    req.user=decoded
                    next()
                }
                else{
                    console.log("invalid token")
                    res.status(403).json({
                        message: "Invalid Token"
                    })
                }
            }
        )
    }else{
        next()
    }
    
  
});

mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("Connected to the DB");
}).catch(()=>{
    console.log("DB connection fail");
})

app.use("/api/products",productRouter);
app.use("/api/users",userRouter);
app.use("/api/orders",orderRouter);
app.use("/api/reviews",reviewRouter);

app.listen(3000, ()=>{
    console.log('Server is runing on port 3000');
    }
); 