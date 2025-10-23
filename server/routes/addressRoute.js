import express from "express";
import authUser from "../middlewares/authUser.js";
import { getAddress,addAddress } from "../controllers/addressController.js";



const addressRoute = express.Router();
addressRoute.post('/add', authUser, addAddress);
addressRoute.get('/get', authUser, getAddress);


export default addressRoute;