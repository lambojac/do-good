"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractIpAddress = void 0;
// Utility function to extract IP address
const extractIpAddress = (req) => {
    // Get IP from X-Forwarded-For header or req.ip
    const forwardedFor = req.headers['x-forwarded-for'];
    const ip = forwardedFor ?
        (typeof forwardedFor === 'string' ? forwardedFor.split(',')[0].trim() : forwardedFor[0]) :
        req.ip;
    return ip || '0.0.0.0';
};
exports.extractIpAddress = extractIpAddress;
//# sourceMappingURL=ipAdress.js.map