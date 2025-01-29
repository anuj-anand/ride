const User = require('../models/User');
const bcrypt = require('bcrypt');
const {sendOTP}=require('../utils/otpServices');
const OtpResponse = require('../models/OtpResponse');

// Create a new user
exports.createUser  = async (req, res) => {
    const { name, email, phone, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, phone, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User  created successfully' });
};

// Get all users
exports.getAllUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};

// Get user by ID
exports.getUserById = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User  not found' });
    res.json(user);
};

// Update user
exports.updateUser  = async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).json({ message: 'User  not found' });
    res.json(user);
};

// Delete user
exports.deleteUser  = async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User  not found' });
    res.json({ message: 'User  deleted successfully' });
};

// Generate OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
};
// Send OTP
exports.sendOtp = async (req, res) => {
    const { email } = req.body;

    // Generate OTP
    const otp = generateOTP();

    try {
        
        await sendOTP(email, otp); // Call the imported sendOTP function
        const saveOtp=await OtpResponse.create({email:email,otpValue:otp});

        res.status(200).json({ message: 'OTP sent successfully', otp }); // You can choose to return the OTP or not
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ message: 'Failed to send OTP' });
    }
};

exports.verifyOtp = async (req, res) => {
    const { email, otpValue } = req.body;

    try {
        // Find the OTP response for the given email
        const otpResponse = await OtpResponse.findOne({ email: email,otpValue:otpValue });

        // Check if an OTP was found
        if (!otpResponse) {
            return res.status(400).json({ message: 'No OTP found for this email.' });
        }

        // Check if the provided OTP matches the stored OTP
        if (otpResponse.otpValue === otpValue) {
            // OTP is valid
            await OtpResponse.deleteOne({ email: email }); 
            return res.status(200).json({ message: 'OTP verified successfully!' });
        } else {
            // OTP is invalid
            return res.status(400).json({ message: 'Invalid OTP. Please try again.' });
        }
    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ message: 'Failed to verify OTP' });
    }
};

