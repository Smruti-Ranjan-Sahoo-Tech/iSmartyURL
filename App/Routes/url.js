let express = require('express');
const { handleGenerateNewShortUrl, handleShortId, handleTest } = require('../Controller/url');
let router = express.Router();

router.get("/test",handleTest);
router.post("/shorten", handleGenerateNewShortUrl);
router.get("/:shortID", handleShortId);




module.exports = router;