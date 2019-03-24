const joi = require('joi');
const scheme = joi.object().keys({
    campaign_id: joi.string().required(),
    campaign_name: joi.string().allow('').required(),
    description: joi.string().allow('').required(),
    clicks_left: joi.number().min(0).required(),
    clicks: joi.number().min(0).required(),
    views_left: joi.number().min(0).required(),
    views: joi.number().min(0).required(),
    starting_date: joi.date().allow('').required(),
    expiration_date: joi.date().allow('').required(),
    days: joi.string().required().allow(''),
    client_info: joi.object().keys({
        name: joi.string().allow('').optional(),
        phone: joi.string().allow('').optional(),
        email: joi.string().allow('').optional(),
        price: joi.number().allow('').optional(),
        balance: joi.number().allow('').optional(),
        details: joi.string().allow('').optional()
    })
});

module.exports = (req, res, next) => {
    joi.validate(req.body, scheme, (err) => {
        if (err) {
            res.status(400).send(err.details[0].message);
        } else {
            next();
        }
    });
}