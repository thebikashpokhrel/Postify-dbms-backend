import Post from "../models/Post.model.js";

export const GetPostsController = async function (req, res) {
  try {
    const result = await Promise.all([Post.findWithUser(), Post.count()]);
    res.status(200).json({
      posts: result[0], //Array of posts
      count: result[1], //Total number of posts count
      message: "Posts fetched successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const GetPostByIdController = async function (req, res) {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json({
      post,
      message: "Post fetched successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const CreatePostController = async function (req, res) {
  try {
    const { title, content, categoryId, userId } = req.body;
    const newPost = new Post(userId, categoryId, title, content);
    const savedPost = await newPost.save();
    if (savedPost) {
      return res.status(201).json({
        savedPost,
        message: "Post Created Successfully",
      });
    }

    return res.status(400).json({
      message: "Error while creating a new post",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const DeletePostController = async function (req, res) {
  try {
    const deleted = await Post.deleteById(req.params.id);
    if (deleted) {
      return res.status(200).json({
        message: "Post deleted successfully",
      });
    }
    return res.status(400).json({
      message: "Error while deleteting the post",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};
