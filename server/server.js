import express from "express";
import cors from "cors";
import registerRouter from "./routes/register.js";
import logoutRouter from "./routes/logout.js";
import LoginRouter from "./routes/login.js";
const app = express();

app.use(cors());
app.use(express.json());

//Routes
app.use("/register", registerRouter);
app.use("/logout", logoutRouter);
app.use("/login", LoginRouter);

// Start server
app.listen(5000, () => console.log("✅ Backend running on http://localhost:5000"));
