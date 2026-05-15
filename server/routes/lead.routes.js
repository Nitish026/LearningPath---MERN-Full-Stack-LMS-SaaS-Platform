import express from 'express';
import {
  createLead,
  getAllLeads,
  updateLeadStatus,
} from '../controller/lead.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const leadRouter = express.Router();

// PUBLIC
leadRouter.post('/create', createLead);

// ADMIN
leadRouter.get('/', protect, getAllLeads);
leadRouter.patch('/:id', protect, updateLeadStatus);

export default leadRouter;
