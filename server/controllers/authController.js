const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Register new user
// @route   POST /api/auth/register
exports.register = async (req, res) => {
    try {
        const { name, email, password, year, branch, division, sapid, rollno } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists with this email' });

        const sapidExists = await User.findOne({ sapid });
        if (sapidExists) return res.status(400).json({ message: 'User already exists with this SAP ID' });

        const user = await User.create({
            name, email, password, year, branch, division, sapid, rollno
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                sapid: user.sapid,
                year: user.year,
                branch: user.branch,
                division: user.division,
                rollno: user.rollno,
                token: generateToken(user._id)
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (user && (await user.comparePassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                sapid: user.sapid,
                year: user.year,
                branch: user.branch,
                division: user.division,
                rollno: user.rollno,
                token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
