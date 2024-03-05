"use strict";
/** @format */
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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: './.env' });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("../config/db");
const errorMiddleware_1 = require("./middlewares/errorMiddleware");
const transactionRoutes_1 = __importDefault(require("./transactionRoutes"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const authMiddleware_1 = require("./middlewares/authMiddleware");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const { PORT } = (_a = process.env) !== null && _a !== void 0 ? _a : 8000;
// Middlewares
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: [`${process.env.FRONTEND_URL}`, `${process.env.HOST_URL}`],
    methods: 'GET,HEAD,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 200,
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static(path_1.default.join(__dirname, '../../../frontend/dist'))); //serve the frontend static asset
}
else {
    app.get('/', (req, res) => {
        res.send('Welcome');
        res.redirect('/api/auth/login');
    });
}
// Routes
app.use('/api/auth', userRoutes_1.default);
app.use('/api/profile', authMiddleware_1.verifyToken, transactionRoutes_1.default);
// Middleware;
app.use(errorMiddleware_1.notFound);
app.use(errorMiddleware_1.errorHandler);
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, db_1.db)();
            console.log('Connected to database');
        }
        catch (error) {
            console.error('Failed to connect to database:', error);
            process.exit(1);
        }
    });
}
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield connectDB();
            app.listen(PORT, () => {
                console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
            });
        }
        catch (error) {
            console.error('Server startup failed:', error);
            process.exit(1);
        }
    });
}
startServer();
// Shutdown
process.on('SIGINT', () => {
    console.log('SIGINT received. Shutting down gracefully');
    process.exit(0);
});
process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully');
    process.exit(0);
});
