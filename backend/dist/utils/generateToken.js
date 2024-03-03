/** @format */

'use strict';
/** @format */
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require('jsonwebtoken'));
function generateToken(res, _id) {
  const token = jsonwebtoken_1.default.sign({ _id }, process.env.SECRET_KEY, {
    expiresIn: '14d',
  });
  res.cookie('access_token', token, {
    httpOnly: true, //prevent XSS attack
    sameSite: 'none',
    secure: process.env.NODE_ENV !== 'development',
    maxAge: 30 * 24 * 60 * 1000,
    domain: process.env.HOST_URL,
  });
  return token;
}
exports.generateToken = generateToken;
