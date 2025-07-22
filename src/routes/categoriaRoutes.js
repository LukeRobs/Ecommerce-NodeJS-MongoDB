import express from 'express';
import {criarCategoria, listarCategorias, listarCategoria, editaCategoria, deletaCategoria} from '../controllers/categoriaController.js'
import { pagination } from '../middlewares/pagination.middleware.js';
const router = express.Router();

router.post('/create', criarCategoria)
router.get('/list', pagination, listarCategorias)
router.get('/list/:id', listarCategoria)
router.put('/edit/:id', editaCategoria)
router.delete('/delete/:id', deletaCategoria)

export default router;