/** @format */

import express from 'express';
import { registerUser } from '../../controllers/auth';

const router = express.Router();
router.post('/auth/register', registerUser);

module.exports = router;
