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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const database_1 = __importDefault(require("./config/database"));
const auth_route_1 = __importDefault(require("./modules/auth/auth.route"));
const landingForm_route_1 = __importDefault(require("./modules/landingPage/landingForm.route"));
const product_route_1 = __importDefault(require("./modules/product/product.route"));
const gallery_route_1 = __importDefault(require("./modules/gallery/gallery.route"));
const seller_route_1 = __importDefault(require("./modules/sellerAccount/seller.route"));
const swagger_1 = __importDefault(require("./swagger"));
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
// Routes
app.use('/api/auth', auth_route_1.default);
app.use("/api/landing-page", landingForm_route_1.default);
app.use('/api/products', product_route_1.default);
app.use('/api/gallery', gallery_route_1.default);
app.use('/api/selleraccounts', seller_route_1.default);
// Swagger
(0, swagger_1.default)(app);
// Database connection
(0, database_1.default)();
app.use('*', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(404).json({ message: " route not found" });
}));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
exports.default = app;
//# sourceMappingURL=app.js.map