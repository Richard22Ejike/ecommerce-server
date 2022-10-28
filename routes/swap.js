const express = require("express");
const swapRouter = express.Router();
const {SwapProduct} = require("../models/swapProduct");
const auth = require("../middlewares/auth");
const User = require("../models/user");


//create swap product
swapRouter.post("/swap/add-product", auth, async (req, res) => {
    try {
      const { name, description, images, userId,  } = req.body;
      let swapProduct = new SwapProduct({
        name,
        description,
        images,
        userId:req.user,
       
      });
      swapProduct = await swapProduct.save();
      res.json(swapProduct);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }); 
  
  swapRouter.get("/swap/get-all-products", auth, async (req, res) => {
    try {
      const swapProducts = await SwapProduct.find({});
      res.json(swapProducts);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });
  swapRouter.get("/swap/get-user-products", auth, async (req, res) => {
    try {
        const swapProducts = await SwapProduct.find({ userId: req.user });
      res.json(swapProducts);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });
  swapRouter.post("/swap/price-product", auth, async (req, res) => {
    try {
      const { id, price } = req.body;
      let swapProduct = await SwapProduct.findById(id);
  
      for (let i = 0; i < swapProduct.prices.length; i++) {
        if (swapProduct.prices[i].userId == req.user) {
            swapProduct.prices.splice(i, 1);
          break;
        }
      }
  
      const priceSchema = {
        userId: req.user,
        price,
      };
  
      swapProduct.prices.push(priceSchema);
      swapProduct = await swapProduct.save();
      res.json(swapProduct);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });
  



  module.exports = swapRouter;