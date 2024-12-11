// models/StoreModel.js
const mongoose = require('mongoose');

// Coupon Schema
const CouponSchema = new mongoose.Schema({
  code: { type: String, required: true },
  description: { type: String },
  discount: { type: Number, required: true },
  discountType: { type: String, enum: ['percentage', 'fixed'], required: true },
  expiryDate: { type: Date },
  terms: { type: String },
  isFeatured: { type: Boolean, default: false },
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  lastUsedAt: { type: Date },
  usageCount: { type: Number, default: 0 },
  votes: { type: Number, default: 0 },
  rating: { type: Number, min: 0, max: 5 },
});

// Store Schema
const StoreSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true }, // New field for store slug
  logo: { type: String },
  url: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  categoryIconUrl: { type: String },
  tags: [String],
  rating: { type: Number, min: 0, max: 5 },
  reviewCount: { type: Number, default: 0 },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  coupons: [CouponSchema],
  verified: { type: Boolean, default: false },
  featuredCoupons: [CouponSchema],
  updatedAt: { type: Date, default: Date.now },
  region: { type: String },
  popularityScore: { type: Number, default: 0 },
  faq: [{ question: String, answer: String }],
  contactInfo: { type: String },
  totalCoupons: { type: Number, default: 0 },
  activeCoupons: { type: Number, default: 0 },
  bestDiscount: { type: Number, default: 0 },
  totalDeals: { type: Number, default: 0 },
  history: { type: String },
  alternatives: [
    {
      name: { type: String, required: true },
      url: { type: String },
      discountsAvailable: { type: Number, default: 0 },
    },
  ],
  recommendedCoupons: [CouponSchema],
  popularStores: [{ name: String, url: String }],
  promotionalInfo: { type: String },
  pointsToKnow: [{ type: String }],
  freeShipping: { type: Boolean, default: false },
  memberDiscount: { type: Boolean, default: false },
  militaryDiscount: { type: Boolean, default: false },
  isTrending: { type: Boolean, default: false },
});

// Middleware to generate slug before saving a store
StoreSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = this.name.toLowerCase().replace(/\s+/g, '-'); // e.g., "Nike Store" -> "nike-store"
  }
  next();
});

module.exports = mongoose.model('Store', StoreSchema);
