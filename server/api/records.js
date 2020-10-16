const { Router } = require('express');
const {
  Records
} = require('../models');
const router = Router();

router.get('/', async (req, res)=>{
  try{
    const allRecords = await Records.findAll();
    return res.json(allRecords);
  }catch(err){
    return res.json(err)
  }
});

router.post('/', async (req, res) => {
  const newRecord = await Records.create(req.body);
  return res.json(newRecord);
});

module.exports = router;