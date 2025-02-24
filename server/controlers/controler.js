const {
    getAll,
    getById,
    deleteById,
    createPost,
    updatePost,
  } = require("../services/service.js");
  
  const router = require("express").Router();
  
  router.get("/", async (req, res) => {
    try {r

      const catalog = await getAll();
  
      res.json( catalog );
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "All",
      });
    }
  });
  
  router.get("/:id", async (req, res) => {
    try {
      const product = await getById(req.params.id); 
      if (!product) {
        return res.status(400).json({
          message: "One photo",
        });
      }
  
      res.json(product); 
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Geted By id",
      });
    }
  });

  router.delete("/delete/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const product = await getById(id);
  
      console.log(product);
  
      if (!product) {
        return res.status(404).json({
          message: "Deleted",
        });
      }
  
      await deleteById(id); 
  
      res.json({
        title: "Delete Post Success",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "delete",
      });
    }
  });
  
  router.post("/create", async (req, res) => {
    try {
      const post = await createPost(req.body);
  
      res.json(post);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Create",
      });
    }
  });
  
  router.post("/update/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const post = await getById(id);
  
      const newPost = {
        id: id,
        title: req.body.title,
        text: req.body.text,
        tags: req.body.tags,
        imageUrl: req.body.imageUrl,
      };
  
      await updatePost(id, newPost);
      res.json(newPost);
  
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "update",
      });
    }
  });
  
   
  
  module.exports = router;
  