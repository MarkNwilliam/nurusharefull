var express = require('express');
var router = express.Router();

/* GET root */
router.get('/', function(req, res, next) {
  res.send('connected');
});

module.exports = router;