import express from "express";
import cors from "cors";
import userRouter from "./routes/userRoutes";
import eventRouter from "./routes/eventRoutes";
import authRouter from "./routes/authRouter";

const app = express();

app.use(cors());
app.use(express.json());


app.use("/users", userRouter);
app.use("/events", eventRouter)
app.use("/test", authRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`http://localhost:${PORT}`);
});
