const { Router } = require('express');

const router = Router();

function logger(req, res, next) {
  console.log(`request fired ${req.url} ${req.method}`);
  next();
}

router.use(logger);

router.use('/records', require('./records'));
router.use('/cites', require('./cities'));
router.use('/countries', require('./countries'));

module.exports = router;