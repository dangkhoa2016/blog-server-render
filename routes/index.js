const static_data = require('../libs/static_data');
const {blogs_repl} = require('../api');
const { posts_repl, posts_graphcms, post_detail, posts_contentful } = require('../controllers');
const paginate = require('../libs/paginate');

const express = require("express");
const router = express.Router();

// Create all our routes and set up logic within those routes where required.
router.get(static_data.home_urls, async function (req, res) {
    var { page_index, page_size } = req.query;
    const posts_paging_info = await blogs_repl.get_list(page_index, page_size);
    res.render('index', {
        posts: posts_paging_info.data,
        type: 'blogs_repl',
        title: 'Welcome to my blog',
        pages_info: paginate(posts_paging_info.total, posts_paging_info.current_page, posts_paging_info.page_size, 3)
    });
});

// Create all our routes and set up logic within those routes where required.
router.get(["/contact", "/contact.html"], function (req, res) {
    res.render("contact", { contact: static_data.contact, title: 'Contact me' });
});

router.get(["/about", "/about.html"], function (req, res) {
    res.render("about", {
        photos: [
            { image: 'images/image_1.jpg', category: 'Travel', name: 'Picture 1' },
            { image: 'images/image_2.jpg', category: 'Nature', name: 'Picture 2' },
            { image: 'images/image_3.jpg', category: 'Fashion', name: 'Picture 3' },
            { image: 'images/image_4.jpg', category: 'Photography', name: 'Picture 4' },
            { image: 'images/image_5.jpg', category: 'Fashion, Model', name: 'Picture 5' },
            { image: 'images/image_6.jpg', category: 'Photography', name: 'Picture 6' },
            { image: 'images/image_7.jpg', category: 'Fashion', name: 'Picture 7' },
            { image: 'images/image_8.jpg', category: 'Nature', name: 'Picture 8' },
            { image: 'images/image_9.jpg', category: 'Model', name: 'Picture 9' },
            { image: 'images/image_10.jpg', category: 'Travel', name: 'Picture 10' },
            { image: 'images/image_11.jpg', category: 'Nature', name: 'Picture 11' },
            { image: 'images/image_12.jpg', category: 'Technology', name: 'Picture 12' },
        ], title: 'About me'
    });
});

router.get(["/blogs_repl", "/blogs_repl.html"], posts_repl.render_list_posts);
router.get(["/blogs_graphcms", "/blogs_graphcms.html"], posts_graphcms.render_list_posts);
router.get(["/blogs_contentful", "/blogs_contentful.html"], posts_contentful.render_list_posts);

router.get(["/:type(blogs_repl|blogs_contentful|blogs_graphcms)/:id", "/:type(blogs_repl|blogs_contentful|blogs_graphcms)/:id.html"],
post_detail.render_post_detail);


// Export routes for server.js to use.
module.exports = router;
