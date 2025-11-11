"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const landingFormController_1 = require("../controller/landingFormController");
const router = express_1.default.Router();
router.post('/', landingFormController_1.landingpageform);
exports.default = router;
//# sourceMappingURL=landingForm.js.map