import jwt from "jsonwebtoken";



const authUser = async (req, res, next) => {
  const {token} = req.cookies;
  if (!token) {
    return res.status(401).json({ success: false, message: "No token, authorization denied" });
  }
  try{
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    if(tokenDecode.id){
      req.userId = tokenDecode.id;

    }else{
      return res.status(401).json({ success: false, message: "Token is not valid" });
    }
    next();

  }catch(error){
    console.error(error.message);
    return res.status(401).json({ success: false, message: "Token is not valid" });
  }

}
export default authUser;