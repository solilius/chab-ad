const joi = require('joi');
const adScheme = joi.object().keys({
    campaign_name: joi.string().required(),
    isActive: joi.bool().required(),
    positions: joi.array().min(1).required(),
    type: joi.string().valid('image', 'gif').required(),
    url: joi.string().required(),
    onclick: joi.string().required()
});

const scheme = joi.object().keys({
    ads: joi.array().items(adScheme).required()
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