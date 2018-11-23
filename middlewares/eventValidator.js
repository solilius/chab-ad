const joi = require('joi');
const scheme = joi.object().keys({
    campaign_id: joi.string().required(),
    ad_id: joi.string().required(),
    action: joi.string().valid('clicked').required(),
    message: joi.string().required(),
    site: joi.string().required(),
    ad_position: joi.string().required(),
    ip: joi.string().required(),
    date: joi.date().required()
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