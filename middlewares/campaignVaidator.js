const joi = require('joi');
const scheme = joi.object().keys({
    campaign_id: joi.string().required(),
    campaign_name: joi.string().required(),
    description: joi.string().required(),
    isActive: joi.bool().required(),
    views_left: joi.number().min(0).required(),
    clicks_left: joi.number().min(0).required(),
    views: joi.number().min(0).required(),
    clicks: joi.number().min(0).required(),
    starting_date: joi.date().required(),
    expiration_date: joi.date().required(),
    views: joi.number().min(0).required(),
    clicks: joi.number().min(0).required(),
    starting_date: joi.date().required(),
    expiration_date: joi.date().required(),
    client_info: joi.object().keys({
        name: joi.string(),
        phone: joi.string().allow('').optional(),
        email: joi.string().allow('').optional(),
        price: joi.number(),
        balance: joi.number(),
        details: joi.string()
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