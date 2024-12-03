const status = require('../helpers/constants.js');
const Joi = require('joi');

const createProfileRules = Joi.object({
    user_id: Joi.string().required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().optional(),
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
  