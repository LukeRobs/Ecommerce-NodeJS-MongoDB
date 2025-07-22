import express from 'express';
import {criarReview, listReviewProduto, deleteReview} from '../controllers/reviewController.js';
import {middlewareAuthentication} from '../middlewares/Authentication.middleware.js'

const router = express.Router();

router.post('/produto/:produtoId', middlewareAuthentication, criarReview);
router.get('/produto/:produtoId', listReviewProduto);
router.delete('/:id', middlewareAuthentication, deleteReview);

export default router