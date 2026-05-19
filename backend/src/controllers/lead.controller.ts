import { Response } from 'express';
import { Lead } from '../models/Lead.model';
import { AuthRequest, ApiResponse } from '../types';
import { Types } from 'mongoose';

export class LeadController {
  createLead = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const lead = await Lead.create({
        ...req.body,
        createdBy: req.user!.id,
      });

      res.status(201).json({
        success: true,
        data: lead,
      } as ApiResponse);
    } catch (error) {
      console.error('Create lead error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
      } as ApiResponse);
    }
  };

  getLeads = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;

      const status = req.query.status as string;
      const source = req.query.source as string;
      const search = req.query.search as string;
      const sort = req.query.sort as string;

      let filter: any = {};

      if (req.user!.role === 'sales_user') {
        filter.createdBy = new Types.ObjectId(req.user!.id);
      }

      if (status && status !== 'all') {
        filter.status = status;
      }

      if (source && source !== 'all') {
        filter.source = source;
      }

      if (search) {
        filter.$or = [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
        ];
      }

      let sortOption: any = { createdAt: -1 };
      if (sort === 'oldest') {
        sortOption = { createdAt: 1 };
      }

      const [leads, total] = await Promise.all([
        Lead.find(filter).sort(sortOption).skip(skip).limit(limit).populate('createdBy', 'name email'),
        Lead.countDocuments(filter),
      ]);

      res.json({
        success: true,
        data: leads,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      } as ApiResponse);
    } catch (error) {
      console.error('Get leads error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
      } as ApiResponse);
    }
  };

  getLeadById = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const lead = await Lead.findById(req.params.id).populate('createdBy', 'name email');

      if (!lead) {
        res.status(404).json({
          success: false,
          error: 'Lead not found',
        } as ApiResponse);
        return;
      }

      if (req.user!.role === 'sales_user' && (lead.createdBy as any)._id.toString() !== req.user!.id) {
        res.status(403).json({
          success: false,
          error: 'Access denied',
        } as ApiResponse);
        return;
      }

      res.json({
        success: true,
        data: lead,
      } as ApiResponse);
    } catch (error) {
      console.error('Get lead by id error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
      } as ApiResponse);
    }
  };

  updateLead = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const lead = await Lead.findById(req.params.id);

      if (!lead) {
        res.status(404).json({
          success: false,
          error: 'Lead not found',
        } as ApiResponse);
        return;
      }

      if (req.user!.role === 'sales_user' && lead.createdBy.toString() !== req.user!.id) {
        res.status(403).json({
          success: false,
          error: 'Access denied',
        } as ApiResponse);
        return;
      }

      const updatedLead = await Lead.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );

      res.json({
        success: true,
        data: updatedLead,
      } as ApiResponse);
    } catch (error) {
      console.error('Update lead error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
      } as ApiResponse);
    }
  };

  deleteLead = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const lead = await Lead.findById(req.params.id);

      if (!lead) {
        res.status(404).json({
          success: false,
          error: 'Lead not found',
        } as ApiResponse);
        return;
      }

      if (req.user!.role !== 'admin') {
        res.status(403).json({
          success: false,
          error: 'Only admins can delete leads',
        } as ApiResponse);
        return;
      }

      await lead.deleteOne();

      res.json({
        success: true,
        message: 'Lead deleted successfully',
      } as ApiResponse);
    } catch (error) {
      console.error('Delete lead error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
      } as ApiResponse);
    }
  };

  exportLeadsCSV = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      let filter: any = {};

      if (req.user!.role === 'sales_user') {
        filter.createdBy = new Types.ObjectId(req.user!.id);
      }

      const leads = await Lead.find(filter).populate('createdBy', 'name email');

      const csvData = leads.map((lead: any) => ({
        Name: lead.name,
        Email: lead.email,
        Status: lead.status,
        Source: lead.source,
        'Created By': lead.createdBy?.name || 'Unknown',
        'Created At': lead.createdAt ? new Date(lead.createdAt).toISOString() : new Date().toISOString(),
      }));

      res.json({
        success: true,
        data: csvData,
      } as ApiResponse);
    } catch (error) {
      console.error('Export leads error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
      } as ApiResponse);
    }
  };
}