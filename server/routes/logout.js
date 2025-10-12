import express from "express";
import { supabase } from "../supabaseClient.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { access_token } = req.body;

    if (!access_token) {
      return res.status(400).json({ error: "Access token required" });
    }

    const { error } = await supabase.auth.admin.revokeUserSession(access_token);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
