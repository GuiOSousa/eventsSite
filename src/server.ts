import express from "express";
import cors from "cors";
import userRouter from "./routes/userRoutes";

const app = express();

app.use(cors());
app.use(express.json());


app.use("/users", userRouter);

// 🔹 Definição da porta do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
