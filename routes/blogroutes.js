const express = require('express')
const router = express.Router();
const Blogs = require('../model/Blogs');
const Authenticate = require("../midleware/Authentication");
const Users = require('../model/Users');
const { check, validationResult } = require("express-validator");

// Create New Blog
router.post('/createblog', [
    check('author').isLength({ min: 3, max: 5 }).isAlpha().withMessage("Author Name is required"),
    check('btitle').isLength({ min: 4, max: 5 }).isAlphanumeric().withMessage("Title is required"),
    check('bcontent').isLength({ min: 20 }).isAlphanumeric().withMessage("Blog Content must greater than 100 words"),
], Authenticate, async (req, res) => {
    const { author, btitle, bcontent } = req.body;
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(422).json({ error: "plz fill" });
        }
        const blog = new Blogs({ author, btitle, bcontent, user: req.userID });
        const saveblog = await blog.save();
        //res.json(saveblog)
        return res.status(200).json({ message: "Blog Posted" });
    } catch (error) {
        console.log(error);
    }
})

// Get Blogs
router.get('/showblogs', Authenticate, async (req, res) => {
    try {
        const blogs = await Blogs.find({ user: req.userID });
        res.json(blogs)
    } catch (error) {
        console.log(error);
    }
})

// Get Blogs by id
router.get('/edit/:id', Authenticate, async (req, res) => {
    try {
        const blogs = await Blogs.findById( req.params.id);
        res.json(blogs)
    } catch (error) {
        console.log(error);
    }
})


// Update Blog
router.put('/updateblog/:id', Authenticate, async (req, res) => {
    try {
        const { author, btitle, bcontent } = req.body;
        const blog = await Blogs.findByIdAndUpdate(req.params.id,
            {
                $set: {
                    "author": req.body.author,
                    "btitle": req.body.btitle,
                    "bcontent": req.body.bcontent,
                }
            },{new:true});
            res.json(blog)

    } catch (error) {
        console.log(error);
    }
})

// Delete Blog
router.delete('/deleteblog/:id', Authenticate, async (req,res)=>{
    try {
        const del = await Blogs.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: "Blog Deleted" });
    } catch (error) {
     console.log(error)   
    }
})

module.exports = router;