const { Router } = require('express');

const router = Router();

router.use('/records', require('./records'));
router.use('/cities', require('./cities'));
router.use('/countries', require('./countries'));
router.use('/classes', require('./classes'));

module.exports = router;