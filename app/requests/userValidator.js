const status = require('../helpers/constants.js');
const Joi = require('joi');

const createProfileRules = Joi.object({
    user_id: Joi.string().required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().optional(),
    position: Joi.string().required(),
    hand_foot: Joi.string().required(),
    age: Joi.number().integer().min(0).required(),
    gender: Joi.string().valid('male', 'female').required(),
});
  
const validateCreateProfile = (req, res, next) => {
    const { error } = createProfileRules.validate(req.body);

    if (error) {
        return res.status(status.HTTP_BAD_REQUEST).json({
            status: status.FAILURE_STATUS,
            message: error.details[0].message,
            data: {},
        });
    }

    next();
};

module.exports = {
    validateCreateProfile
}
  