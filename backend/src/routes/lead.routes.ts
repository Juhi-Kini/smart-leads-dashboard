import express from 'express';
import { LeadController } from '../controllers/lead.controller';
import { authenticateToken } from '../middleware/auth.middleware';
import { leadValidation, updateLeadValidation } from '../middleware/validation.middleware';

const router = express.Router();
const leadController = new LeadController();

// Apply authentication to all lead routes
router.use(authenticateToken);

router.post('/', leadValidation, leadController.createLead);
router.get('/', leadController.getLeads);
router.get('/export', leadController.exportLeadsCSV);
router.get('/:id', leadController.getLeadById);
router.put('/:id', updateLeadValidation, leadController.updateLead);
router.delete('/:id', leadController.deleteLead);

export default router;
