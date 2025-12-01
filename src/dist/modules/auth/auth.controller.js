"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgotPassword = exports.restoreUser = exports.deleteUser = exports.updateUser = exports.getUserById = exports.getAllUsers = exports.logOut = exports.loginUser = exports.createUser = void 0;
const user_1 = __importDefault(require("../../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const genToken_1 = __importDefault(require("../../utils/genToken"));
const cloudinary_1 = __importDefault(require("../../config/cloudinary"));
const crypto_1 = __importDefault(require("crypto"));
const email_1 = require("../../utils/email");
// create user
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullName, password, confirmPassword, email } = req.body;
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = new user_1.default({
            fullName,
            password: hashedPassword,
            email,
            confirmPassword
        });
        const savedUser = yield newUser.save();
        res.status(201).json(savedUser);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.createUser = createUser;
//login
exports.loginUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("Please provide email and password.");
    }
    const user = yield user_1.default.findOne({ email });
    if (!user) {
        res.status(400);
        throw new Error("User not found, Please sign up!");
    }
    const passwordIsValid = yield bcrypt_1.default.compare(password, user.password);
    if (!passwordIsValid) {
        res.status(400);
        throw new Error("Invalid email or password.");
    }
    // Generate token
    const token = (0, genToken_1.default)(user.id.toString());
    // Update last login
    user.updatedAt = new Date();
    yield user.save();
    // Set cookie
    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 24 * 60 * 60),
        sameSite: "none",
        secure: true,
    });
    // Return safe user info
    const { id, role, phone_number, address } = user;
    const fullName = (_a = user.fullName) !== null && _a !== void 0 ? _a : "";
    const userEmail = (_b = user.email) !== null && _b !== void 0 ? _b : user.email;
    res.status(200).json({
        id,
        fullName,
        email: userEmail,
        role,
        phone: phone_number,
        address,
        lastLogin: user.updatedAt,
        token,
    });
}));
exports.logOut = (0, express_async_handler_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // expire the session
    res.cookie("token", "", {
        path: "/",
        httpOnly: true,
        expires: new Date(),
        sameSite: "none",
        secure: true,
    });
    res.status(200).json({ message: "you are Sucessfully logged out" });
}));
//getallusers
const getAllUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.find().select('-password -confirmPassword');
        const formattedUsers = users.map(user => ({
            user_id: user._id.toString(),
            fullName: user.fullName,
            email: user.email,
            phone: user.phone_number,
            address: user.address,
            user_role: user.role,
            date_created: new Date(user.date_created).toISOString().split("T")[0],
            lastLogin: user.updatedAt,
            status: user.isDeleted ? "non-active" : "active"
        }));
        res.status(200).json(formattedUsers);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getAllUsers = getAllUsers;
//getuserbyid
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findById(req.params.id).select('-password -confirmPassword');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            phone: user.phone_number,
            address: user.address,
            role: user.role,
            lastLogin: user.updatedAt,
            status: user.isDeleted ? "non-active" : "active"
        });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return res.status(500).json({ error: message });
    }
});
exports.getUserById = getUserById;
//update user
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        let updatedData = req.body;
        // Handle password update
        if (updatedData.password) {
            updatedData.password = yield bcrypt_1.default.hash(updatedData.password, 10);
        }
        if (req.file) {
            const result = yield cloudinary_1.default.uploader.upload(req.file.path, {
                folder: 'profile_pictures',
                transformation: [{ width: 300, height: 300, crop: 'fill' }],
            });
            updatedData.profilePicture = result.secure_url;
        }
        // Update user in database
        const updatedUser = yield user_1.default.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(updatedUser);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.updateUser = updateUser;
// //delete user
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedUser = yield user_1.default.findByIdAndUpdate(id, { isDeleted: true, deletedAt: new Date() }, { new: true });
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ message: 'User deactivated successfully' });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.deleteUser = deleteUser;
// restore user
const restoreUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const restoredUser = yield user_1.default.findByIdAndUpdate(id, { isDeleted: false, deletedAt: null }, { new: true });
        if (!restoredUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ message: 'User reactivated successfully' });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.restoreUser = restoreUser;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const user = yield user_1.default.findOne({ email });
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        // Generate reset token
        const token = crypto_1.default.randomBytes(32).toString('hex');
        console.log(token);
        // Set token and expiry in user record
        user.resetPasswordToken = token;
        user.resetPasswordExpires = new Date(Date.now() + 3600000);
        yield user.save();
        // Send reset email
        const resetUrl = `http://localhost:3000/auth/reset-password?token=${token}`;
        yield (0, email_1.sendEmail)(user.email, 'Password Reset Request', `Click this link to reset: ${resetUrl}`);
        return res.status(200).json({ message: 'Reset email sent' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
});
exports.forgotPassword = forgotPassword;
// reset password
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }
    try {
        const user = yield user_1.default.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: new Date() }
        });
        if (!user)
            return res.status(400).json({ message: 'Invalid or expired token' });
        // Hash the new password
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // Update user password and remove token fields
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        yield user.save();
        return res.status(200).json({ message: 'Password successfully reset' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
});
exports.resetPassword = resetPassword;
//# sourceMappingURL=auth.controller.js.map