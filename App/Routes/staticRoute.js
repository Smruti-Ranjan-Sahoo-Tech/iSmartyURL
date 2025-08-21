let express = require('express')
let router = express.Router()
const urlModel = require('../Model/url.model');

router.get('/', async (req, res) => {
    // let allUrl = await urlModel.find({});
     res.render("home");
})
module.exports = router