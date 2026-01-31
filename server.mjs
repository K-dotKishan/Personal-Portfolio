import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// ✅ middleware
app.use(cors());
app.use(express.json());

// ✅ MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error", err));

// ✅ Health check
app.get("/", (req, res) => {
  res.send("🚀 Backend is running successfully");
});

// ✅ Contact schema
const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const Contact = mongoose.model("Contact", ContactSchema);

// ✅ Contact API
app.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).send("All fields required");
    }

    await Contact.create({ name, email, message });

    res.status(200).send("Message saved successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// ✅ PORT (Railway/Render compatible)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
