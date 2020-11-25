const { Router } = require('express');
const {
  Classes
} = require('../models');
const { addClassValidation } = require('../validate')
const router = Router();

// get all the classes
router.get('/', async (req, res)=>{
  try{
    const allclasses = await Classes.findAll();
    return res.json(allclasses);
  }catch(err){
    return res.json(err)
  }
});

// post new class
router.post('/', async (req, res) => {
    try{
      // validate the class password
      await addClassValidation(req.body);
      const classObj = {
        school: req.body.school,
        class:  req.body.class
      }
        const newClass = await Classes.create(classObj);
        return res.json(newClass);
    }catch(err) {
      return res.send('wrong details');
    }
});

module.exports = router;