import Express from 'express';
import dotenv from "dotenv";
import { connectDB } from './src/config/db.js';
import userRoutes from './src/routes/userRoutes.js';
import produtoRoutes from './src/routes/produtoRoutes.js';
import categoriaRoutes from './src/routes/categoriaRoutes.js';
import reviewRoutes from './src/routes/reviewRoutes.js';

dotenv.config();
const app = Express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(Express.json());
app.use('/', userRoutes );
app.use('/categorias', categoriaRoutes);
app.use('/produtos', produtoRoutes);
app.use('/reviews', reviewRoutes);


app.listen(PORT, async () => {
    console.log(`Servidor Rodando em http:localhost:${PORT}`);
});