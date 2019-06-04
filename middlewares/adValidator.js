const joi = require('joi');
const adScheme = joi.object().keys({
    campaign_id: joi.string().required(),
    campaign_name: joi.string().allow('').optional(),
    ad_id: joi.string().required(),
    positions: joi.array().required(),
    url: joi.string().required(),
    onclick: joi.string().allow('').optional(),
    size: joi.string().required(),
    clicks: joi.number().required(),
    views: joi.number().required(),
    expiration_date: joi.string().allow('').required(),
    starting_date:  joi.string().allow('').required(),
    isActive: joi.bool().required()
});

const scheme = joi.object().keys({
    banners: joi.array().items(adScheme).required()
});

module.exports = (req, res, next) => {
    joi.validate(req.body, scheme, (err) => {
        if(err){
            res.status(400).send(err.details[0].message);
        } else {
            next();
        }
    });
}