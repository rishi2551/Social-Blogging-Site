import express from "express";
import { Blog } from "../models/blog.js";
import { applyMiddleware } from "../middleware/auth.js";
// import multer from "multer";
import { upload } from "../middleware/fileUpload.js";
import moment from "moment";
const blogrouter = express.Router();

blogrouter.post("/createblog",applyMiddleware, upload.single("image"), async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file.path;
    if (!title || !description || !image) {
      return res.status(400).json({ message: "all field is required" });
    }
    const blog = new Blog({
      users:req.users,
      title,
      description,
      image,
      liked: false,
      created_date: new Date(),
      
    });
    await blog.save();
    res.status(201).json({
      blog,
    });
  } catch (err) {
    console.log(err, "error");
  }
});

blogrouter.get("/getpost",applyMiddleware, async (req, res) => {
  try {
    const userId=req.users;
    const postblog = await Blog.find({users:userId});
    res.json(postblog);
  } catch (err) {
    console.log(err);
  }
});
// blogrouter.get("/", async (req, res) => {
//   try {
//     res.send({ message: "jdsjjjs" });
//   } catch (err) {
//     console.log(err);
//   }
// });
blogrouter.get("/filter",applyMiddleware, async (req, res) => {
  try {
    const { title, created_date } = req.query;
    let query = {};
    if (title) {
      query.title = title;
    }
    if (created_date) {
      const startofday = moment(created_date).startOf("day").toDate();
      const endofday = moment(created_date).endOf("day").toDate();
      console.log(startofday, endofday);
      query.created_date = { $gte: startofday, $lte: endofday };
    }
    const blog = await Blog.find(query);
    res.json(blog);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
});
blogrouter.get("/postblog/:id", applyMiddleware, async (req, res) => {
  const id = req.params.id;
  try {
    const postblog = await Blog.findById(id);
    res.json(postblog);
  } catch (err) {
    console.log(err);
  }
});
blogrouter.get("/search", applyMiddleware,async (req, res) => {
  try {
    const { searchtext } = req.query;
    if (!searchtext) {
      return res.json([]);
    }
    const searchResults = await Blog.find({
      title: { $regex: searchtext, $options: "i" },
    });
    res.json(searchResults);
  } catch (error) {
    console.error("Error searching the blog:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

blogrouter.patch("/update/:id", applyMiddleware, async (req, res) => {
  try {
    const id = req.params.id;
    const updated = req.body;
    const updatedBlog = await Blog.findByIdAndUpdate(id, updated, {
      new: true,
    });
    res.json(updatedBlog);
  } catch (error) {
    console.log(error);
  }
});
blogrouter.put("/updateblog/:id", upload.single("image"), async (req, res) => {
  const id = req.params.id;
  const image = req?.file?.path;
  const { title, description } = req.body;
  try {
    const updateblog = await Blog.findByIdAndUpdate(
      id,
      {
        title,
        description,
        image,
      },
      { new: true }
    );
    res.json(updateblog);
  } catch (err) {
    console.log(err);
  }
});
blogrouter.delete("/deletepost/:id", applyMiddleware, async (req, res) => {
  const id = req.params.id;
  try {
    const deletepost = await Blog.findByIdAndDelete(id);
    if (!deletepost) {
      return res.status(404).json({ message: "post not exist" });
    }
    res.json("successfully deleted");
  } catch (err) {
    console.log(err);
  }
});

blogrouter.post("/postblog/:id/comment", applyMiddleware, async (req, res) => {
  const id = req.params.id;
  const { comment } = req.body;
  try {
    const addcomment = await Blog.findById(id);
    if (!addcomment) {
      return res.status(404).json({ message: "post not exist" });
    }
    addcomment.comments.push({ comment });
    await addcomment.save();
    res.status(201).json(addcomment);
  } catch (err) {
    console.log(err, "error during comment");
  }
});
blogrouter.delete(
  "/postblog/:id/comment/:commentId",
  applyMiddleware,
  async (req, res) => {
    const id = req.params.id;
    const commentId = req.params.commentId;
    try {
      const post = await Blog.findById(id);
      if (!post) {
        return res.status(404).json({ message: "post not found" });
      }
      post.comments.pull(commentId);
      await post.save();
      res.json(post);
    } catch (err) {
      console.log(err, "err");
    }
  }
);

export default blogrouter;
