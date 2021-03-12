const {blogs_graphcms} = require('../api');

const render_list_posts = async (req, res) => {
    var { page_index, page_size } = req.query;
    const posts = await blogs_graphcms.get_list(page_index, page_size);

    res.render('blogs_graphcms', {
        posts: posts.posts,
        type: 'blogs_graphcms',
        title: 'Blog using Graph CMS',
        page_index: posts.page_index || 1
    });
}

module.exports = {render_list_posts};
