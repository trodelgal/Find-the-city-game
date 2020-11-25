const { Router } = require('express');
const {
  Countries
} = require('../models');

const router = Router();

// get all the city by country name
router.get('/:contryName', async (req, res)=>{
  try{
    const country = await Countries.findOne({
      where: { name: req.params.contryName}
    });
    const countryCities = await country.getCities()
    return res.json(countryCities);
  }catch(err){
    return res.json(err)
  }
});

module.exports = router;