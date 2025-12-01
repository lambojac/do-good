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
exports.changePasswordEmail = exports.sendEmail = void 0;
const mail_1 = __importDefault(require("@sendgrid/mail"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
mail_1.default.setApiKey(process.env.SENDGRID_API_KEY);
const sendEmail = (to, subject, html) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mail_1.default.send({
            to,
            from: process.env.FROM_EMAIL, // must be verified in SendGrid
            subject,
            html,
        });
        console.log(`Verification email sent to ${to}`);
    }
    catch (error) {
        console.error("Error sending verification email:", error);
        throw error;
    }
});
exports.sendEmail = sendEmail;
const changePasswordEmail = (email, code) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mail_1.default.send({
            to: email,
            from: process.env.FROM_EMAIL,
            subject: "Change Password",
            text: `Your OTP for password change is: ${code}. It expires in 10 minutes.`,
        });
        console.log(`Password change email sent to ${email}`);
    }
    catch (error) {
        console.error("Error sending password change email:", error);
    }
});
exports.changePasswordEmail = changePasswordEmail;
//# sourceMappingURL=email.js.map