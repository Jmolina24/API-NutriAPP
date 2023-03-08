const { Router } = require("express");
const router  = Router();
const swaggerUI = require("swagger-ui-express");
const docs = require('../docs');



router.use('/api-docs',swaggerUI.serve,swaggerUI.setup(docs));




module.exports = router;