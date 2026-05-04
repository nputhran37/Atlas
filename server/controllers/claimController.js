const Claim = require('../models/Claim');
const Item = require('../models/Item');

// Create a new claim
const createClaim = async (req, res) => {
    try {
        const { itemId, answers } = req.body;
        
        const item = await Item.findById(itemId);
        if (!item) return res.status(404).json({ message: 'Item not found' });

        // Prevent double claiming
        const existingClaim = await Claim.findOne({ item: itemId, claimer: req.user.id });
        if (existingClaim) return res.status(400).json({ message: 'You have already filed a claim for this item' });

        const newClaim = new Claim({
            item: itemId,
            claimer: req.user.id,
            answers
        });

        const savedClaim = await newClaim.save();
        res.status(201).json(savedClaim);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get claims for items reported by the current user
const getClaimsForMe = async (req, res) => {
    try {
        // Find items reported by current user
        const myItems = await Item.find({ reportedBy: req.user.id }).select('_id');
        const itemIds = myItems.map(item => item._id);

        // Find claims for those items
        const claims = await Claim.find({ item: { $in: itemIds } })
            .populate('item')
            .populate('claimer', 'name email sapid')
            .sort({ date: -1 });

        res.status(200).json(claims);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update claim status
const updateClaimStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const claim = await Claim.findById(req.params.id).populate('item');
        
        if (!claim) return res.status(404).json({ message: 'Claim not found' });

        // Ensure current user is the one who reported the item
        if (claim.item.reportedBy.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        claim.status = status;
        await claim.save();

        res.status(200).json(claim);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get claims filed by the current user
const getMyClaims = async (req, res) => {
    try {
        const claims = await Claim.find({ claimer: req.user.id })
            .populate({
                path: 'item',
                populate: { path: 'reportedBy', select: 'name email' }
            })
            .sort({ date: -1 });
        res.status(200).json(claims);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createClaim,
    getClaimsForMe,
    getMyClaims,
    updateClaimStatus
};
