const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({
        status: 200,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
        },
        token: token,
        message: "User  login successfully"
    })
};

// Signup
exports.signup = async (req, res) => {
    // Similar to createUser  but with additional logic for JWT
    const { name, email, phone, password } = req.body;

    // Check if the user already exists
    const existingUser  = await User.findOne({ email });
    if (existingUser ) {
        return res.status(400).json({ message: 'User  already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
        name,
        email,
        phone,
        password: hashedPassword,
    });

    try {
        await user.save();
        res.status(201).json({ message: 'User  created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
};