const { Router } = require('express');
const {
  Records
} = require('../models');
const router = Router();
const { Op } = require("sequelize");

// get the date string
function getDayString(dateNow){
  let year = new Date(dateNow).getFullYear()
  let day = new Date(dateNow).getDate()
  let month = new Date(dateNow).getMonth() +1;
  return `${year}/${month}/${day}`;
}

// get the start of the current date
const getStartOfDayTime = (dateNow) =>{
  const date = getDayString(dateNow)
  const startOfDay = new Date(date);
  return startOfDay.getTime();
}

// get all the records by country
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
    const startOfTheDate = getStartOfDayTime(Date.now());
    const allRecords = await Records.findAll({
      where: {country:req.params.country, created_at: {
        [Op.gte]: startOfTheDate,
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