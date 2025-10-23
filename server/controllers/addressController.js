import Address from "../models/Address.js";



//Add Address : /api/address/add
export const addAddress = async (req, res) => {
  try{
    const { address } = req.body;
    const { userId } = req;
    await Address.create({ userId, ...address });
    res.json({ success: true, message: "Address added successfully" });

  }catch(error){
    console.error(error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

//Get Address : /api/address/get
export const getAddress = async (req, res) => {
  try{
    const { userId } = req;
    const addresses = await Address.find({ userId });
    res.status(200).json({ success: true, addresses });
  }catch(error){
    console.error(error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};