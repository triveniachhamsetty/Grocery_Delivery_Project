import express from "express";
import { upload } from "../configs/multer.js";
import { addProduct, changeStock, productById, productList } from "../controllers/productController.js";
import authSeller from "../middlewares/authSeller.js";



const productRoute = express.Router();
productRoute.post('/add', upload.array("images"), authSeller, addProduct);
productRoute.get('/list', productList);
productRoute.get('/:id', productById);
productRoute.patch('/stock/:id', authSeller, changeStock);


export default productRoute;