import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
    price: { type: Number, required: true },
    description: { type: String },
    includes: [{ type: String }],
    image: { type: String },
    rating: { type: String, default: "4.8" },
    reviews: { type: String, default: "241K" },
    time: { type: String, default: '1 hr 15 mins' }
});

export default mongoose.model('Service', serviceSchema);
