const { Router } = require('express');
const {
  Classes
} = require('../models');
const router = Router();

router.get('/', async (req, res)=>{
  try{
    const allclasses = await Classes.findAll();
    return res.json(allclasses);
  }catch(err){
    return res.json(err)
  }
});

router.post('/', async (req, res) => {
    try{
        const newClass = await Classes.create(req.body);
        return res.json(newClass);
    }catch(err) {
        return res.json(err)
    }
});

module.exports = router;