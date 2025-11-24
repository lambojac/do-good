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
exports.landingpageform = void 0;
const landingForm_1 = __importDefault(require("../../models/landingForm"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
exports.landingpageform = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullname, email, phoneNumber, subject, message } = req.body;
    // Validation
    if (!fullname || !email || !phoneNumber || !subject || !message) {
        res.status(400);
        throw new Error("All fields are required");
    }
    // Save form data
    const newForm = yield landingForm_1.default.create({
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
}));
//# sourceMappingURL=landingFormController.js.map