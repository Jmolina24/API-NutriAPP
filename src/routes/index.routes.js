const { Router } = require("express");
import config from '../config';
const router = Router();

router.get('/', (req, res) => {
    res.redirect('/api/v1/');
})

router.get('/api/v1/', (req, res) => {
    const data = {
        "Api": "Rest Api Nutrición",
        "Version": `${config.version}`,
        "Year": "2026",
        "Developer": "Desarrollado por UiiLab",
        "URL": "https://www.instagram.com/uiilab/"
    }
    res.json(data);
})





module.exports = router;