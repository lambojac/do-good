"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.landingpageform = void 0;
const landingForm_1 = __importDefault(require("../models/landingForm"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
exports.landingpageform = (0, express_async_handler_1.default)(async (req, res) => {
    const { fullname, email, phoneNumber, subject, message } = req.body;
    if (!fullname || !email || !phoneNumber || !subject || !message) {
        res.status(400);
        throw new Error("All fields are required");
    }
    const newForm = await landingForm_1.default.create({
        fullname,
        email,
        phoneNumber,
        subject,
        message,
    });
    res.status(201).json({
        success: true,
        message: "Form submitted successfully!",
        data: newForm,
    });
});
//# sourceMappingURL=landingFormController.js.map