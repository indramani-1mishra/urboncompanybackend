import mongoose from 'mongoose';

const vendorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    subcategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory', required: true },
    price: { type: Number, required: true },
    description: { type: String },
    image: { type: String }
});

export default mongoose.model('Vendor', vendorSchema);
