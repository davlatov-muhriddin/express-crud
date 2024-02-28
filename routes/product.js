import { Router } from "express";
import ProductModel from "../models/Product.js";
const router = Router();

router.get("/", async (req, res) => {
  try {
    const products = await ProductModel.find({});
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    res.status(200).json({ success: true, product });
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const { image, title, description, price } = req.body;

    if (!image || !title || !description || !price) {
      res.json({
        success: false,
        error: "Iltimos barcha bo'imlarni to'ldiring",
      });
    }

    const product = await ProductModel.create(req.body);
    res.status(201).json({ success: true, product });
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { image, title, description, price } = req.body;

    if (!image || !title || !description || !price) {
      res.json({
        success: false,
        error: "Iltimos barcha bo'imlarni to'ldiring",
      });
    }

    const updateProduct = await ProductModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updateProduct) {
      return res
        .status(404)
        .json({ success: false, error: "product topilmadi" });
    }

    res.status(200).json({ success: true, product: updateProduct });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleteProduct = await ProductModel.findByIdAndDelete(id);

    if (!deleteProduct) {
      return res
        .status(404)
        .json({ success: false, error: "product topilmadi" });
    }

    res.status(200).json({
      success: true,
      message: "product o'chirildi",
    });
  } catch (error) {
    console.log(error);
  }
});

export default router;
