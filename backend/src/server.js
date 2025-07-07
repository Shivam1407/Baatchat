import express from "express"
import "dotenv/config";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js"
import userRoutes from "./routes/user.route.js"
import chatRoutes from "./routes/chat.route.js"
import { connectDB } from "./lib/db.js";

const PORT = process.env.PORT
const app = express()

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("api/chat", chatRoutes);
app.listen(PORT,()=>{
    console.log(`Server is running on port 5k1 ${PORT}`);
    connectDB();
});

