import { body, validationResult } from 'express-validator';
import { Response, NextFunction, Request } from 'express';

export const validateRequest = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      error: errors.array()[0].msg,
    });
    return;
  }
  next();
};

export const registerValidation = [
  body('name').notEmpty().withMessage('Name is required').trim(),
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').optional().isIn(['admin', 'sales_user']),
  validateRequest,
];

export const loginValidation = [
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
  validateRequest,
];

export const leadValidation = [
  body('name').notEmpty().withMessage('Name is required').trim(),
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('source').isIn(['Website', 'Instagram', 'Referral']).withMessage('Valid source is required'),
  body('status').optional().isIn(['New', 'Contacted', 'Qualified', 'Lost']),
  validateRequest,
];

export const updateLeadValidation = [
  body('name').optional().trim(),
  body('email').optional().isEmail().normalizeEmail(),
  body('status').optional().isIn(['New', 'Contacted', 'Qualified', 'Lost']),
  body('source').optional().isIn(['Website', 'Instagram', 'Referral']),
  validateRequest,
];