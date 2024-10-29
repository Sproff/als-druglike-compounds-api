"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = exports.ErrorHandler = void 0;
class ErrorHandler extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}
exports.ErrorHandler = ErrorHandler;
const handleError = (err, res) => {
    res.status(err.statusCode || 500).json({
        message: err.message,
        status: "error",
        data: null,
    });
};
exports.handleError = handleError;
