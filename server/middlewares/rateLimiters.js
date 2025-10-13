const rateLimit = require("express-rate-limit");

const viewLimiter = rateLimit({
    windowMs: 1 * 1000,
    max: 10,
    message: "Too many view requests from this IP, please try again later.",
    standardHeaders: true,
    legacyHeaders: false,
});

const createLimiter = rateLimit({
    windowMs: 1 * 1000,
    max: 1,
    message: "Too many create requests, try again later",
    standardHeaders: true,
    legacyHeaders: false,
});

const updateLimiter = rateLimit({
    windowMs: 1 * 1000,
    max: 2,
    message: "Too many update requests, try again later",
    standardHeaders: true,
    legacyHeaders: false,
});

const deleteLimiter = rateLimit({
    windowMs: 1 * 1000,
    max: 5,
    message: "Too many delete requests, try again later",
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = { createLimiter, updateLimiter, viewLimiter, deleteLimiter };
