const express = require("express")
const router = express.Router();
const fs = require('fs');
const routedata = require('./crud.js')

router.use(routedata)
module.exports = router;