const mongoose = require('mongoose');

// Coupon Schema
const CouponSchema = new mongoose.Schema({
  code: { type: String, required: true }, // Coupon code is required
  description: { type: String }, // Brief description of the coupon
  discount: { type: Number, required: true }, // Discount amount is required
  discountType: { type: String, enum: ['percentage', 'fixed'], required: true }, // Type of discount is required
  expiryDate: { type: Date }, // Expiry date for the coupon
  terms: { type: String }, // Terms and conditions for the coupon
  isFeatured: { type: Boolean, default: false }, // Highlight popular coupons
  
  isVerified: { type: Boolean, default: false }, // Whether the coupon is verified
  createdAt: { type: Date, default: Date.now }, // Creation date
  lastUsedAt: { type: Date }, // Last usage date
  usageCount: { type: Number, default: 0 }, // How many times the coupon has been used
  votes: { type: Number, default: 0 }, // Number of votes for the coupon
  rating: { type: Number, min: 0, max: 5 }, // User rating for the coupon
});

// Store Schema
const StoreSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // Store name
  logo: { type: String }, // Store logo image URL
  url: { type: String, required: true }, // Store website URL

  description: { type: String }, // Store description
  category: { type: String }, // Store category (e.g., Electronics, Groceries)
  categoryIconUrl: { type: String }, // New field for category icon URL
  tags: [String], // Tags for search and filtering
  rating: { type: Number, min: 0, max: 5 }, // Overall store rating
  reviewCount: { type: Number, default: 0 }, // Number of reviews for the store
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' }, // Store status
  coupons: [CouponSchema], // List of coupons associated with the store (optional)
  verified: { type: Boolean, default: false }, // Indicates if the store is verified
  featuredCoupons: [CouponSchema], // Highlighted coupons for the store (optional)
  updatedAt: { type: Date, default: Date.now }, // Last updated timestamp
  region: { type: String }, // Specific region or country for the store
  popularityScore: { type: Number, default: 0 }, // Popularity score for ranking
  faq: [{ question: String, answer: String }], // FAQs related to the store
  contactInfo: { type: String }, // Store's contact information
  totalCoupons: { type: Number, default: 0 }, // Total coupons available for the store
  activeCoupons: { type: Number, default: 0 }, // Active coupons available for the store
  bestDiscount: { type: Number, default: 0 }, // Best discount percentage available today
  totalDeals: { type: Number, default: 0 }, // Total number of deals (e.g., sales, promotions)
  history: { type: String }, // History or background of the store
  alternatives: [
    {
      name: { type: String, required: true },
      url: { type: String },
      discountsAvailable: { type: Number, default: 0 },
    },
  ], // List of alternative stores
  recommendedCoupons: [CouponSchema], // Recommended coupon list (optional)
  popularStores: [{ name: String, url: String }], // List of popular stores with promo codes (optional)
  promotionalInfo: { type: String }, // Store's Promotional Information
  pointsToKnow: [{ type: String }], // Points you should know about
  freeShipping: { type: Boolean, default: false }, // Free shipping availability
  memberDiscount: { type: Boolean, default: false }, // Member discount availability
  militaryDiscount: { type: Boolean, default: false }, // Military discount availability
  isTrending: { type: Boolean, default: false },

});

module.exports = mongoose.model('Store', StoreSchema);
