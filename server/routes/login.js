import express from "express";
import { supabase } from "../supabaseClient.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) return res.status(401).json({ message: error.message });

    //email verification
    if (!data.user?.email_confirmed_at) {
      return res.status(403).json({ message: "Please verify your email before logging in." });
    }

    //session
    res.status(200).json({
      message: "Login successful",
      user: data.user,
      session: data.session, 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Unexpected server error" });
  }
});

export default router;
