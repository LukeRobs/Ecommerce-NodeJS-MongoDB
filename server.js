import Express from 'express';
import dotenv from "dotenv";
import { connectDB } from './src/config/db.js';
import userRoutes from './src/routes/userRoutes.js'

dotenv.config();
const app = Express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(Express.json());
app.use("/", userRoutes );

app.listen(PORT, async () => {
    console.log(`Servidor Rodando em http:localhost:${PORT}`);
});