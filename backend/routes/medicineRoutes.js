import express from "express";
import Medicine from "../models/Medicine.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


router.post("/add", authMiddleware, async (req, res) => {

  const { name, time } = req.body;

  const medicine = new Medicine({

    userId: req.user.id,
    name,
    time

  });

  await medicine.save();

  res.json({ message: "Medicine saved" });

});

export default router;