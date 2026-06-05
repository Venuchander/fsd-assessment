import express from "express";
import protectedRoutes from "./routes/protected";

const app = express();

app.use(express.json());
app.use("/", protectedRoutes);

export default app;
