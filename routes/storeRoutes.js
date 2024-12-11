const express = require('express');
const router = express.Router();
const StoreController = require('../controllers/StoreController');

// CREATE - Add a new store
router.post('/stores', StoreController.createStore);

// READ - Get all stores
router.get('/stores', StoreController.getStores);

// READ - Get a store by ID
router.get('/stores/id/:id', StoreController.getStoreById);

// UPDATE - Update a store
router.put('/stores/id/:id', StoreController.updateStore);

// DELETE - Delete a store
router.delete('/stores/id/:id', StoreController.deleteStore);

// ADD COUPONS - Add coupons to a store
router.post('/stores/:id/coupons', StoreController.addCoupons);
router.get('/search', StoreController.searchStores);


module.exports = router;
