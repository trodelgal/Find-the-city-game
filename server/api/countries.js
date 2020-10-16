const { Router } = require('express');
const {
  Countries
} = require('../models');
const router = Router();

router.get('/', async (req, res)=>{
  try{
    console.log('here');
    const allCountries = await Countries.findAll({});
    return res.json(allCountries);
  }catch(err){
    return res.json(err)
  }
});
module.exports = router;