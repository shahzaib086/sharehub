const status = require('../helpers/constants.js');
const Joi = require('joi');

// Define rules for each entity
const rules = {
  createPost: Joi.object({
    title: Joi.string().required(),
    price: Joi.string().required(),
    pickup_address: Joi.string().required(),
    description: Joi.string().required(),
    expiry_date: Joi.string().required(),
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
  validateCreatePost: validate(rules.createPost),
};
