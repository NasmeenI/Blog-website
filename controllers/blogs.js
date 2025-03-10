const Blog = require('../models/Blog');

//@desc Get all blogs
//@route GET /api/v1/blogs
//@access Public
exports.getBlogs = async (req,res,next) => {
    try {
        const blog = await Blog.find();
        res.status(200).json({success:true, data:blog});
    } catch (err) {
        res.status(400).json({success:false});
    }
}

//@desc Get single blog
//@route GET /api/v1/blogs/:id
//@access Public
exports.getBlog = async (req,res,next) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if(!blog){
            return res.status(400).json({success:false});
        }
        res.status(200).json({success:true, data:blog});
    } catch (err) {
        res.status(400).json({success:false});
    }
}

//@desc Create a blog
//@route POST /api/v1/blogs
//@access Private
exports.createBlog = async (req, res, next) => {
    try {
        req.body.user = req.user.id;
        const blog = await Blog.create(req.body);
        res.status(200).json({
            success: true,
            data: blog
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};
//@desc Update single blog
//@route PUT /api/v1/blogs/:id
//@access Private
exports.updateBlog = async (req,res,next) => {
    try {
        const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if(!blog){
            return res.status(400).json({success:false});
        }

        res.status(200).json({success:true, data:blog});
    } catch (err) {
        res.status(400).json({success:false});
    }
}

//@desc Delete single blog
//@route DELETE /api/v1/blogs/:id
//@access Private
exports.deleteBlog = async (req,res,next) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if(!blog){
            return res.status(400).json({success:false});
        }

        res.status(200).json({success:true, data:{}});
    } catch (err) {
        res.status(400).json({success:false});
    }
}
