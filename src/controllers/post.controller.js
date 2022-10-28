const postService = require('../services/post.service');

const authService = require('../services/auth.service');

const BAD_REQUEST = 400;

const addNewBlogPost = async (req, res) => {
  const { authorization } = req.headers;
  const { body } = req;
  const user = await authService.validateToken(authorization);
  if (user.type) return res.status(user.type).json({ message: user.message });
  const { type, message } = await postService.addNewBlogPost(body, user.id);
  if (type === BAD_REQUEST) return res.status(type).json({ message });
  return res.status(type).json(message);
};

module.exports = {
  addNewBlogPost,
};