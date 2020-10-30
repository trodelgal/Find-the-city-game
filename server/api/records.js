const { Router } = require('express');
const {
  Records
} = require('../models');
const router = Router();
const { Op } = require("sequelize");

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
router.get('/:country/today', async (req, res)=>{
  try{
    const oneDay = 1 * 24 * 60 * 60 * 1000;
    const allRecords = await Records.findAll({
      where: {country:req.params.country, created_at: {
        [Op.gte]: new Date(Date.now() - oneDay),
      }},
      order: [['score', 'DESC']]
    });
    return res.json(allRecords);
  }catch(err){
    return res.json(err)
  }
});
router.get('/:classId/:country', async (req, res)=>{
  try{
    const classId = parseInt(req.params.classId);
    const allClassRecords = await Records.findAll({
      where: {classId:classId , country:req.params.country},
      order: [['score', 'DESC']]
    });
    return res.json(allClassRecords);
  }catch(err){
    return res.json(err)
  }
});
router.get('/:classId/:country/today', async (req, res)=>{
  try{
    const oneDay = 1 * 24 * 60 * 60 * 1000;
    const classId = parseInt(req.params.classId);
    const allClassRecords = await Records.findAll({
      where: {classId:classId , country:req.params.country, created_at:{
        [Op.gte]: new Date(Date.now() - oneDay),
      }},
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