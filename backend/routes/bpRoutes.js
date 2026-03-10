import express from "express";
import BPRecord from "../models/BPRecord.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", authMiddleware, async (req, res) => {

  try {

    let { systolic, diastolic, pulse } = req.body;

    systolic = Number(systolic);
    diastolic = Number(diastolic);
    pulse = Number(pulse);

    const record = new BPRecord({
      userId: req.user.id,
      systolic,
      diastolic,
      pulse
    });

    await record.save();

    res.json({ message: "BP saved" });

  } catch (err) {

    console.log(err);

    res.status(500).json({ message: "Server error" });

  }

});

router.get("/history", authMiddleware, async (req, res) => {

  try {

    const records = await BPRecord
      .find({ userId: req.user.id })
      .sort({ date: -1 });

    res.json(records);

  } catch (err) {

    res.status(500).json({ message: "Server error" });

  }

});

router.delete("/:id", authMiddleware, async (req, res) => {

  try {

    const result = await BPRecord.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!result) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.json({ message: "BP record deleted" });

  } catch (err) {

    console.log(err);
    res.status(500).json({ message: "Server error" });

  }

});

router.delete("/all", authMiddleware, async (req, res) => {

  try {

    await BPRecord.deleteMany({ userId: req.user.id });
    res.json({ message: "All BP records deleted" });

  } catch (err) {

    console.log(err);
    res.status(500).json({ message: "Server error" });

  }

});

export default router;