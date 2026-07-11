import { Router, Request, Response } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

// GET /products - get all products
router.get("/", async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch products" });
  }
});

// GET /products/:id - get single product
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
    });
    if (!product) {
      res.status(404).json({ success: false, message: "Product not found" });
      return;
    }
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch product" });
  }
});

// POST /products - create a product
router.post("/", async (req: Request, res: Response) => {
  try {
    const {
      name,
      shortDescription,
      description,
      price,
      category,
      sizes,
      colors,
      images,
      stock,
    } = req.body;

    const product = await prisma.product.create({
      data: {
        name,
        shortDescription,
        description,
        price: parseFloat(price),
        category,
        sizes,
        colors,
        images,
        stock: parseInt(stock) || 0,
      },
    });
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to create product" });
  }
});

// PATCH /products/:id - update a product
router.patch("/:id", async (req: Request, res: Response) => {
  try {
    const product = await prisma.product.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update product" });
  }
});

// DELETE /products/:id - delete a product
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    await prisma.product.delete({
      where: { id: req.params.id },
    });
    res.json({ success: true, message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete product" });
  }
});

export default router;