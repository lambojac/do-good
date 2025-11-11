"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const multer_1 = __importDefault(require("../middleware/multer"));
const router = express_1.default.Router();
router.post('/', userController_1.createUser);
router.post('/login', userController_1.loginUser);
router.get('/logout', userController_1.logOut);
router.get('/get-all-users', userController_1.getAllUsers);
router.get('/:id', userController_1.getUserById);
router.patch('/:id', multer_1.default.single('profilePicture'), userController_1.updateUser);
router.delete('/:id', userController_1.deleteUser);
router.patch('/:id/restore', userController_1.restoreUser);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map