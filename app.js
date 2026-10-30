import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./src/config/database.js";
import { UserModel } from "./src/models/user.model.js";
import { EventModel } from "./src/models/event.model.js";
import { CategoryModel } from "./src/models/category.model.js";
import { userRouter } from "./src/routes/users.route.js";
import { authRouter } from "./src/routes/auth.route.js";
import { categoriesRouter } from "./src/routes/categories.route.js";

const app = express();
const PORT = process.env.PORT;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

//Routes
app.use("/api", authRouter);
app.use("/api", userRouter);
app.user("/api", categoriesRouter);

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
