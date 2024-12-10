const status = require('../helpers/constants.js');
const Joi = require('joi');

// Define rules for each entity
const rules = {
  noticeCreate: Joi.object({
    title: Joi.required(),
    description: Joi.required(),
    set_reminder: Joi.boolean().required(),
    reminder_type: Joi.valid('hourly', 'daily', 'weekly').optional(),
    notice_date: Joi.date().optional(),
  }),
  noticeUpdate: Joi.object({
    notice_id: Joi.required(),
    title: Joi.required(),
    description: Joi.required(),
    set_reminder: Joi.boolean().required(),
    reminder_type: Joi.valid('hourly', 'daily', 'weekly').optional(),
    notice_date: Joi.date().optional(),
  }),
  noticeDetails: Joi.object({
    notice_id: Joi.required(),
  }),
};

// Reusable validation middleware
const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(status.HTTP_BAD_REQUEST).json({
      status: status.FAILURE_STATUS,
      message: error.details[0].message,
      data: {},
    });
  }
  next();
};

// Export validation middlewares
module.exports = {
  validateNoticeCreate: validate(rules.noticeCreate),
  validateNoticeUpdate: validate(rules.noticeUpdate),
  validateNoticeDetails: validate(rules.noticeDetails),
};
