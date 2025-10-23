import jwt from "jsonwebtoken";



// Login Seller : /api/seller/login

export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
  if (email == process.env.SELLER_EMAIL && password == process.env.SELLER_PASSWORD) {
    const token = jwt.sign({email}, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.cookie("sellerToken", token, {
        httpOnly: true, //prevent client-side JS from accessing the cookie
        secure: process.env.NODE_ENV === "production", //Use secure cookies in production
        sameSite: process.env.NODE_ENV === "production" ? "None" : "strict", //CSRF protection
        maxAge: 7 * 24 * 60 * 60 * 1000, // cookie expiration time in 7 days
      });
    return  res.status(200).json({ success: true, message: "Seller login successfully" });
  }else{
    return res.status(401).json({ success: false, message: "Invalid Seller Credentials" });
  }

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

//Check isAuth : /api/seller/is-auth
export const isSellerAuth = async (req, res) => {
  try {
    return res.json({ success: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

//Logout User : /api/user/logout
export const sellerLogout = async (req, res) => {
  try {
    res.clearCookie("sellerToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "strict",
    });
    return res.status(200).json({ success: true, message: "User logged out successfully"
    })
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}