const { validationResult } = require('express-validator');

const validateResul = (req, res, next) => {
    try {
        validationResult(req).throw()
        return next()
    } catch (err) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(412).json({ errors: errors.array() });
        }
    }
}

module.exports = { validateResul }