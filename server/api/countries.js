const { Router } = require('express');
const {
  Countries
} = require('../models');
const router = Router();

// get all the countries
router.get('/', async (req, res)=>{
  try{
    const allCountries = await Countries.findAll({});
    return res.json(allCountries);
  }catch(err){
    return res.json(err)
  }
});
module.exports = router;