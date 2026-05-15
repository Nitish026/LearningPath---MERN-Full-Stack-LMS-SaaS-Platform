import { Lead } from '../models/lead.model.js';

export const createLead = async (req, res) => {
  try {
    const { name, email, phone, classLevel, goal } = req.body;

    if (!name || !email || !phone || !classLevel || !goal) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required.',
      });
    }

    const lead = await Lead.create({
      name,
      email,
      phone,
      classLevel,
      goal,
    });

    return res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully.',
      lead,
    });
  } catch (error) {
    console.log('Create lead error:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to submit inquiry.',
    });
  }
};

export const getAllLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      leads,
    });
  } catch (error) {
    console.log('Get leads error:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch leads.',
    });
  }
};

export const updateLeadStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const lead = await Lead.findByIdAndUpdate(id, { status }, { new: true });

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Lead updated successfully.',
      lead,
    });
  } catch (error) {
    console.log('Update lead error:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to update lead.',
    });
  }
};
