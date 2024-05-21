import jwt from "jsonwebtoken"

export const applyMiddleware=(req,res,next)=>{
    const token=req.headers.authorization;
    if(!token){
        return res.status(400).json({message:"token not found"});
    }
    try{
        const tokenwithoutBearer=token.split(" ")[1];
        const decode = jwt.verify(tokenwithoutBearer,process.env.JWT_SECRET_KEY)
        req.users=decode.userId;
        next();
   }
   catch(err){
    console.log(err,"something went wrong ");
    return res.status(400).json({message:"token is not valid"})
   }
}