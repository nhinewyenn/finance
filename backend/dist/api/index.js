/** @format */

'use strict';
/** @format */
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
var _a;
Object.defineProperty(exports, '__esModule', { value: true });
const dotenv_1 = __importDefault(require('dotenv'));
dotenv_1.default.config({ path: './.env' });
const express_1 = __importDefault(require('express'));
const cookie_parser_1 = __importDefault(require('cookie-parser'));
const cors_1 = __importDefault(require('cors'));
const db_1 = require('../config/db');
const errorMiddleware_1 = require('./middlewares/errorMiddleware');
const transactionRoutes_1 = __importDefault(require('./transactionRoutes'));
const userRoutes_1 = __importDefault(require('./userRoutes'));
const authMiddleware_1 = require('./middlewares/authMiddleware');
const path_1 = __importDefault(require('path'));
const app = (0, express_1.default)();
const { PORT } = (_a = process.env) !== null && _a !== void 0 ? _a : 8000;
// Middlewares
app.use(express_1.default.json());
app.use(
  (0, cors_1.default)({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(
  express_1.default.static(
    path_1.default.join(__dirname, '../../../frontend/dist')
  )
); //serve the frontend static asset
// Middleware: Redirect root URL to login route
app.get('/', (req, res) => {
  res.redirect('/api/v1/auth/login');
});
// Routes
app.use(
  '/api/v1/profile',
  authMiddleware_1.verifyToken,
  transactionRoutes_1.default
);
app.use('/api/v1/auth', userRoutes_1.default);
// Middleware;
app.use(errorMiddleware_1.notFound);
app.use(errorMiddleware_1.errorHandler);
function server() {
  (0, db_1.db)();
  app.listen(PORT, () => {
    console.log('You are listening to PORT', PORT);
  });
}
server();
