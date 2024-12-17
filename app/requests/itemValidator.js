const status = require('../helpers/constants.js');
const Joi = require('joi');

// Define rules for each entity
const rules = {
  createItem: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    lat: Joi.string().optional(),
    lng: Joi.string().optional(),
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
  validateCreateItem: validate(rules.createItem),
};
