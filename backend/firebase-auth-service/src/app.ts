import express from "express";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "./routes/authRoutes";

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/", (req, res) => {
	res
		.status(201)
		.json({ message: `Server Running on PORT ${process.env.PORT}` });
});

export default app;
