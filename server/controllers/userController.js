import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//Register User : /api/user/register
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if(!name || !email || !password){
      return res.status(400).json({ success: false, message: "All fields are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) 
      return res.status(400).json({ success: false, message: "User already exists" });
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, password: hashedPassword });
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
      res.cookie("token", token, {
        httpOnly: true, //prevent client-side JS from accessing the cookie
        secure: process.env.NODE_ENV === "production", //Use secure cookies in production
        sameSite: process.env.NODE_ENV === "production" ? "None" : "strict", //CSRF protection
        maxAge: 7 * 24 * 60 * 60 * 1000, // cookie expiration time in 7 days
      });
      return res.status(200).json({ success: true, message: "User registered successfully", user: { name: user.name, email: user.email }

      });
    
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Server Error" });

  }
};


//Login User : /api/user/login

export const login = async (req, res) => {
  try {
    console.log("🟢 Login request body:", req.body);
    const { email, password } = req.body;
    if(!email || !password)
      return res.status(400).json({ success: false, message: "All fields are required" });
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ success: false, message: "Invalid credentials" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ success: false, message: "Invalid credentials" });
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
      res.cookie("token", token, {
        httpOnly: true, //prevent client-side JS from accessing the cookie
        secure: process.env.NODE_ENV === "production", //Use secure cookies in production
        sameSite: process.env.NODE_ENV === "production" ? "None" : "strict", //CSRF protection
        maxAge: 7 * 24 * 60 * 60 * 1000, // cookie expiration time in 7 days
      });
      return res.status(200).json({ success: true, message: "User login successfully", user: { name: user.name, email: user.email }

    });

    
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Server Error" });

  }
}

//Check Auth : /api/user/is-auth
export const isAuth = async (req, res) => {
  try {
    const {userId} = req;
    const user = await User.findById(userId).select("-password");
    return res.json({ success: true, user });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}


//Logout User : /api/user/logout
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
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