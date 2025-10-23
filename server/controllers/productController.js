import Product from "../models/Product.js";
import { v2 as cloudinary } from "cloudinary";

//Add Product : /api/product/add
export const addProduct = async (req, res) => {
  try {
    let productData = JSON.parse(req.body.productData);

    const images = req.files

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {resource_type: "image"});
        return result.secure_url;
      })
    )
    await Product.create({...productData, image: imagesUrl });
    res.json({success:true, message: "Product added successfully"});
  }catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }

};

//Get Product : /api/product/list
export const productList = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, products });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }

};

//Get single Product : /api/product/id
export const productById = async (req, res) => {
  try{
    const {id} = req.params;
    const product = await Product.findById(id)
    res.json({success: true, product})

  }catch(error){
    console.error(error.message);
    res.status(500).json({ success: false, message: "Server Error" });

  }

}

//Change Product inStock Status : /api/product/stock
export const changeStock = async (req, res) => {
  try{
    const { inStock } = req.body
    const {id} = req.params;
    await Product.findByIdAndUpdate(id, { inStock });
    res.json({ success: true, message: "Product stock status updated successfully" });

  }catch(error){
    console.error(error.message);
    res.status(500).json({ success: false, message: "Server Error" });

  }

};