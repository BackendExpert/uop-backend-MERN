const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    faculty: { type: String, required: true, default: 'Admin'},
    role: { type: String, default: "user", enum: ['user', 'admin', 'dvc'] },
    isActive: { type: Boolean, default: false }
}, {timestamps: true});

const User = mongoose.model('User', UserSchema);

module.exports = User;