const express = require('express');
const { getBlogs, getBlog, createBlog, updateBlog, deleteBlog } = require('../controllers/blogs');
const router = express.Router();

const { protect, authorize } = require('../middleware/auth')

router.route('/').get(protect, authorize("user"), getBlogs).post(protect, authorize("user"), createBlog);
router.route('/:id').get(protect, authorize("user"), getBlog).put(protect, authorize("user"), updateBlog).delete(protect, authorize("user"), deleteBlog);

module.exports = router;