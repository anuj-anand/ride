const mongoose =require('mongoose');

const otpSchema= new mongoose.Schema({
    email: { type: String, required: true },
    otpValue:{type: Number, required:true},

},{timestamps:true});
module.exports=mongoose.model('OtpResponse',otpSchema); 