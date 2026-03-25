import Category from '../models/Category.js';
import Subcategory from '../models/Subcategory.js';
import Vendor from '../models/Vendor.js';
import Service from '../models/Service.js';

export const getCategories = async (req, res) => {
    const categories = await Category.find({});
    res.json(categories);
};

export const getSubcategories = async (req, res) => {
    const subcategories = await Subcategory.find({ category: req.params.categoryId });
    res.json(subcategories);
};

export const getVendors = async (req, res) => {
    const vendors = await Vendor.find({ subcategory: req.params.subId });
    res.json(vendors);
};

export const getVendorServices = async (req, res) => {
    const services = await Service.find({ vendor: req.params.vendorId });
    const vendorAdmin = await Vendor.findById(req.params.vendorId);
    res.json({ vendor: vendorAdmin, services });
};

export const getAllAdminVendors = async (req, res) => {
    const vendors = await Vendor.find().populate({
        path: 'subcategory',
        populate: { path: 'category' }
    });
    res.json(vendors);
};

// Admin only routes for adding
export const addCategory = async (req, res) => {
    try {
        const categoryData = { ...req.body };
        if (req.file) categoryData.image = req.file.path;
        const category = await Category.create(categoryData);
        res.status(201).json(category);
    } catch(err){ res.status(500).json({message: err.message}) }
};

export const addSubcategory = async (req, res) => {
    const sub = await Subcategory.create(req.body);
    res.status(201).json(sub);
};

export const addVendor = async (req, res) => {
    try {
        const vendorData = { ...req.body };
        if (req.file) vendorData.image = req.file.path;
        const vendor = await Vendor.create(vendorData);
        res.status(201).json(vendor);
    } catch(err){ res.status(500).json({message: err.message}) }
};

export const editVendor = async (req, res) => {
    try {
        const vendorData = { ...req.body };
        if (req.file) vendorData.image = req.file.path;
        const vendor = await Vendor.findByIdAndUpdate(req.params.id, vendorData, { new: true });
        res.status(200).json(vendor);
    } catch(err) { res.status(500).json({message: err.message}) }
};

export const addService = async (req, res) => {
    try {
        const serviceData = { ...req.body };
        if (req.file) serviceData.image = req.file.path;
        if(serviceData.includes && typeof serviceData.includes === 'string') {
            serviceData.includes = serviceData.includes.split(',').map(s=>s.trim());
        }
        const service = await Service.create(serviceData);
        res.status(201).json(service);
    } catch(err) { res.status(500).json({message: err.message}) }
};
