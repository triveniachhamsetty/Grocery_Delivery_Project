import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./configs/connectDB.js";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js";
import sellerRoute from "./routes/sellerRoute.js";
import productRoute from "./routes/productRoute.js";
import cartRoute from "./routes/cartRoute.js";
import addressRoute from "./routes/addressRoute.js";
import orderRoute from "./routes/orderRoute.js";
import connectCloudinary from "./configs/cloudinary.js";
import { stripeWebhooks } from "./controllers/orderController.js";
import bodyParser from "body-parser";


dotenv.config(); // Load environment variables first

const app = express();
const PORT = process.env.PORT || 3000;

// Allow multiple origins
const allowedOrigins = ["http://localhost:5173"];

app.post('/stripe', bodyParser.raw({type: 'application/json'}), stripeWebhooks)

// Middleware configuration
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

// Connect to MongoDB
connectDB();
connectCloudinary();

// Test route
app.get("/", (req, res) => {
  res.send("API IS WORKING ✅");
});
app.use('/api/user', userRoute);
app.use('/api/seller', sellerRoute);
app.use('/api/product', productRoute);
app.use('/api/cart', cartRoute);
app.use('/api/address', addressRoute);
app.use('/api/order', orderRoute);


// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port http://localhost:${PORT}`);
});
