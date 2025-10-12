import express from "express";
import { supabase } from "../supabaseClient.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, password, role, gender, birthDate, region, sport, bio } = req.body;

  try {
    //creates user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: "http://localhost:8080/login",  
        data: { name, role },  
      },
    });

    if (authError) throw new Error(authError.message);

    //inserts user details in users table
    const { error: userError } = await supabase.from("users").insert({
      user_id: authData.user?.id,
      fullname: name,
      role,
      gender,
      birthdate: birthDate,
      location: region,
      sport_id: parseInt(sport, 10),
      bio,
      registration_date: new Date().toISOString(),
    });

    if (userError) throw new Error(userError.message);

    res.status(201).json({
      message: "Registration successful. Please check your email to verify your account.",
    });
  } catch (error) {
    console.error("Registration Error:", error.message);
    res.status(400).json({ message: error.message });
  }
});

export default router;
