import jwt from "jsonwebtoken";


const authSeller = async (req, res, next) => {
  const {sellerToken} = req.cookies;
  if (!sellerToken) {
    return res.status(401).json({ success: false, message: "No token, authorization denied" });
  }
  try{
      const tokenDecode = jwt.verify(sellerToken, process.env.JWT_SECRET);
      if(tokenDecode.email === process.env.SELLER_EMAIL){
        next();
      }else{
        return res.status(401).json({ success: false, message: "Token is not valid" });
      }
  
    }catch(error){
      console.error(error.message);
      return res.status(401).json({ success: false, message: "Token is not valid" });
    }

}
export default authSeller;