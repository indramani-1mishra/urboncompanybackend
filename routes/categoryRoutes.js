import express from 'express';
import { 
    getCategories, getSubcategories, getVendors, getVendorServices, 
    addCategory, addSubcategory, addVendor, editVendor, addService, getAllAdminVendors 
} from '../controllers/categoryController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { upload } from '../config/cloudinary.js';

const router = express.Router();

router.get('/', getCategories);
router.get('/vendors/all', protect, admin, getAllAdminVendors);
router.get('/:categoryId/subcategories', getSubcategories);
router.get('/subcategory/:subId/vendors', getVendors);
router.get('/vendor/:vendorId/services', getVendorServices);

// Admin routes with upload
router.post('/', protect, admin, upload.single('image'), addCategory);
router.post('/subcategory', protect, admin, addSubcategory);
router.post('/vendor', protect, admin, upload.single('image'), addVendor);
router.put('/vendor/:id', protect, admin, upload.single('image'), editVendor);
router.post('/service', protect, admin, upload.single('image'), addService);

export default router;
