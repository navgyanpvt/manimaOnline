import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICoupon extends Document {
    code: string;
    discountType: 'PERCENTAGE' | 'FLAT';
    discountValue: number;
    minOrderValue: number;
    isActive: boolean;
    createdAt: Date;
    adImage?: string;
}

const CouponSchema: Schema = new Schema({
    code: {
        type: String,
        required: [true, "Please provide a coupon code"],
        unique: true,
        trim: true,
        uppercase: true,
    },
    discountType: {
        type: String,
        enum: ['PERCENTAGE', 'FLAT'],
        required: [true, "Please provide a discount type"],
    },
    discountValue: {
        type: Number,
        required: [true, "Please provide a discount value"],
    },
    minOrderValue: {
        type: Number,
        default: 0,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    adImage: {
        type: String, // Store image URL
        required: false
    }
});

const Coupon: Model<ICoupon> = mongoose.models.Coupon || mongoose.model<ICoupon>("Coupon", CouponSchema);

export default Coupon;
