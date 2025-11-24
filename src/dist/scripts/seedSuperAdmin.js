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
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../models/user")); // Adjust the path as needed
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const seedSuperAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(process.env.MONGODB_URI);
        // Check if a superadmin already exists
        const existingSuperAdmin = yield user_1.default.findOne({ role: "superadmin" });
        if (existingSuperAdmin) {
            console.log("Superadmin already exists");
            return process.exit(0);
        }
        // Hash password
        const hashedPassword = yield bcrypt_1.default.hash("SuperAdmin123!", 10);
        // Create superadmin user
        const superAdmin = new user_1.default({
            firstName: "Super",
            lastName: "Admin",
            password: hashedPassword,
            gender: "Other",
            address: "SuperAdmin Address",
            country: "Unknown",
            username: "superadmin",
            email: "superadmin@example.com",
            phone_number: "+1234567890",
            role: "superadmin"
        });
        yield superAdmin.save();
        console.log("Superadmin user seeded successfully!");
        process.exit(0);
    }
    catch (error) {
        console.error("Error seeding superadmin:", error);
        process.exit(1);
    }
});
seedSuperAdmin();
//# sourceMappingURL=seedSuperAdmin.js.map