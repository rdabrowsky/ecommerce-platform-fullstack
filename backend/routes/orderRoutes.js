import express from 'express';
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getAllOrders,
} from '../controllers/orderController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, admin, getAllOrders).post(protect, addOrderItems);
router.route('/mine').get(protect, getMyOrders);
router.route('/:id').get(protect, admin, getOrderById);
router.route('/:id/deliver').get(protect, admin, updateOrderToDelivered);
router.route('/:id/pay').get(protect, admin, updateOrderToPaid);
export default router;
