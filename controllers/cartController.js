import Cart from '../models/Cart.js';

export const addToCart = async (req, res) => {
    const { serviceId } = req.body;
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
        cart = await Cart.create({ user: req.user.id, items: [{ service: serviceId }] });
    } else {
        cart.items.push({ service: serviceId });
        await cart.save();
    }
    res.status(201).json(cart);
};

export const getCart = async (req, res) => {
    const cart = await Cart.findOne({ user: req.user.id }).populate({
        path: 'items.service',
        populate: { path: 'vendor' }
    });
    res.json(cart);
};

export const removeFromCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user.id });
        if (cart) {
            cart.items = cart.items.filter(item => item._id.toString() !== req.params.itemId);
            await cart.save();
        }
        res.status(200).json(cart);
    } catch (e) {
        res.status(500).json({message: e.message});
    }
};

export const getAllCarts = async (req, res) => {
    const carts = await Cart.find({}).populate('user', 'name email').populate({
        path: 'items.service',
        populate: { path: 'vendor' }
    });
    res.json(carts);
};
