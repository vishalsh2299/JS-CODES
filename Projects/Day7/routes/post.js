const express = require("express");
const router = express.Router();
const { Post } = require("../model/Post");

// GETTING POST
router.get("/", (req, res) => {
  Post.find({}, (err, foundPosts) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(foundPosts);
    }
  });
});

// COMPOSING POST
router.post("/compose", (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  //console.log(post);

  post.save((err) => {
    if (!err) {
      res.status(200).json(post);
    } else {
      console.log(err);
    }
  });
});

// DELETING POST
router.post("/delete", (req, res) => {
  const postId = req.body.id;

  Post.findByIdAndRemove(postId, (err, foundPosts) => {
    if (!err) {
      console.log("Successfully deleted post");
      res.status(200).send(foundPosts);
    } else {
      console.log(err);
    }
  });
});

// EDIT POST
router.post("/edit", (req, res) => {
  //console.log(req.body);

  Post.findByIdAndUpdate(
    req.body.id,
    { title: req.body.title, content: req.body.content },
    { new: true },
    (err, foundPosts) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send(foundPosts);
      }
    }
  );
});

module.exports = router;
