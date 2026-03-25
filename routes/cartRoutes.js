import express from 'express';
import { addToCart, getCart, getAllCarts, removeFromCart } from '../controllers/cartController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, addToCart);
router.get('/', protect, getCart);
router.delete('/:itemId', protect, removeFromCart);

// Admin to see carts
router.get('/all', protect, admin, getAllCarts);

export default router;
