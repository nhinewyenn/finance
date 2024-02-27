"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFound = void 0;
function notFound(req, res, next) {
    const err = new Error(`Not found ${req.originalUrl}`);
    res.status(404);
    next(err);
}
exports.notFound = notFound;
function errorHandler(err, req, res, next) {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        statusCode = 404;
        message = 'Resource not found';
    }
    res.status(statusCode).json({
        success: false,
        message: message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
}
exports.errorHandler = errorHandler;
