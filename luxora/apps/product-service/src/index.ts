import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/product.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "product-service",
    port: PORT,
  });
});

// Routes
app.use("/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Product service running on port ${PORT}`);
});