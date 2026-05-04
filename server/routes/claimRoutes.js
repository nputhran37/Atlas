const express = require('express');
const router = express.Router();
const { createClaim, getClaimsForMe, getMyClaims, updateClaimStatus } = require('../controllers/claimController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createClaim);
router.get('/received', protect, getClaimsForMe);
router.get('/my-claims', protect, getMyClaims);
router.put('/:id/status', protect, updateClaimStatus);

module.exports = router;
