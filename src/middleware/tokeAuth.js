const jwt = require("jsonwebtoken");
import config from '../config';

const tokenSign = async (id) => {
    return jwt.sign(
        { _user: id }, config.jwtSecret, { expiresIn: '24h' }
    );
}

const verifyTokeAuth = (req, res, next) => {
    const { tsec } = req.headers;
    req.token = tsec;
    if (req.token == undefined) {
        return res.status(403).json({ codigo: 1, mensaje: "Forbidden - Not Authorized" });
    } else {
        jwt.verify(req.token, config.jwtSecret, (error, authData) => {
            if (error) {
                return res.status(403).send(error);
            } else {
                next();
            }
        })
    }
}

module.exports = { verifyTokeAuth, tokenSign }