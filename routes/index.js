const express = require('express');
const router = express.Router();
// const catalog = require("catalog")

/* GET home page. */
router.get('/', function (req, res) {
  res.redirect("/catalog")
});

module.exports = router;
