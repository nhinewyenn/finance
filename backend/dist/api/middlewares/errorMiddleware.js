"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFound = void 0;
function notFound(req, res, next) {
    const err = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404).json({
        success: false,
        message: err.message,
    });
}
exports.notFound = notFound;
function errorHandler(err, req, res, next) {
    let status = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        message = 'Resource not found';
    }
    res.status(status).json({
        success: false,
        message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
}
exports.errorHandler = errorHandler;
