const router = require('express').Router();

const Admin = require("../model/Admin");


router.get("/get", async (req, res) => {
    try {
      const getAll = await Admin .find();

      if (!getAll) 
      return  res.status(400).json("No users");

      res.status(200).json(getAll);
    } catch (err) {
      res.status(400).json({ msg: err });
    }
  });

  
router.get("/getOne", async (req, res) => {
    //console.log(req.body._id);
    try {
      const getOne = await Admin.findById( req.body._id);

      if (!getOne) 
      return  res.status(400).json("No user");

      console.log(getOne);
      res.status(200).json(getOne);
    } catch (err) {
      res.status(400).json({ msg: err });
    }
  });
  
  //posting the request
    router.post("/send", async (req, res) => {
    // console.log(req.body);
    const user = new Admin ({
      name: req.body.name,
      position: req.body.position,
      email: req.body.email,
      password: req.body.password
    });
  
    try {
      const savedPost = await user.save();
      if (!savedPost) 
      return  res.status(400).json("No data to save");
  
      res.status(200).json({ savedPost });
    } catch (err) {
      res.status(400).json({ msg: err });
    }
  });

  //deleting the request

router.delete('/delete', async (req, res) => {
    console.log(req.params)
    try {
      const removedPosts = await Admin .remove({_id: req.params.postId});
      if (!removedPosts) 
      return  res.status(400).json("No data to delete");
  
      res.status(200).json("Deleted successfully");
    } catch (err) {
      res.status(400).json({ msg: err });
    }
  });
  
  //update
  router.patch('/update', async (req, res) =>{
     //console.log(req.body)
     try {
      const updatedPost=await Admin .updateOne(    
          req.body._id, 
        { 
          name: req.body.name,
          position: req.body.position,
          email: req.body.email,
          password: req.body.password
        })
        if (!updatedPost) 
        return   res.status(400).json("Cannot update");
  
           res.status(200).json(" Updated succesfully");
        } catch (err) {
              res.status(400).json({ msg: err });
            }
  });


  module.exports = router;