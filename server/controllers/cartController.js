import User from "../models/User.js";



//Update User CartData : /api/cart/update
export const updateCart = async (req, res) => {
  try{
    const { cartItems } = req.body;
    const { userId } = req;
    await User.findByIdAndUpdate(userId, { cartItems });
    res.json({ success: true, message: "Cart updated successfully" });
  }catch(error){
    console.error(error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}; 