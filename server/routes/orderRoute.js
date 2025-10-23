import express from "express";
import authSeller from "../middlewares/authSeller.js";
import authUser from "../middlewares/authUser.js";
import { getAllOrders, getUserOrders, placeOrderCOD, placeOrderStripe } from "../controllers/orderController.js";


const orderRoute = express.Router();

orderRoute.post('/cod', authUser, placeOrderCOD);
orderRoute.get('/user', authUser, getUserOrders);
orderRoute.post('/seller', authSeller, getAllOrders);
orderRoute.post('/stripe', authUser, placeOrderStripe);





export default orderRoute;