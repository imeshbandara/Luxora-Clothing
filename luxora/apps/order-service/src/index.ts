import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./lib/mongoose";
import orderRoutes from "./routes/order.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3003;

app.use(cors());
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "order-service",
    port: PORT,
  });
});

// Routes
app.use("/orders", orderRoutes);

// Connect to MongoDB then start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Order service running on port ${PORT}`);
  });
});