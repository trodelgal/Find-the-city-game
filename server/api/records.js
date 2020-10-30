const { Router } = require('express');
const {
  Records
} = require('../models');
const router = Router();

router.get('/:country', async (req, res)=>{
  try{
    const allRecords = await Records.findAll({
      where: {country:req.params.country},
      order: [['score', 'DESC']]
    });
    return res.json(allRecords);
  }catch(err){
    return res.json(err)
  }
});
router.get('/:classId/:country', async (req, res)=>{
  try{
    const allClassRecords = await Records.findAll({
      where: {classId:req.params.classId , country:req.params.country},
      order: [['score', 'DESC']]
    });
    return res.json(allClassRecords);
  }catch(err){
    return res.json(err)
  }
});

router.post('/', async (req, res) => {
  try{
    const newRecord = await Records.create(req.body);
    return res.json(newRecord);
  }catch(err) {
    return res.json(err)
  }
});

module.exports = router;