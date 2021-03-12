const {blogs_contentful} = require('../api');
const paginate = require('../libs/paginate');

const render_list_posts = async (req, res) => {
    var { page_index, page_size } = req.query;
    const posts_paging_info = await blogs_contentful.get_list(page_index, page_size);
    
    res.render('blogs_contentful', {
        posts: posts_paging_info.items,
        type: 'blogs_contentful',
        title: 'Blog using Contentful',
        pages_info: paginate(posts_paging_info.total, posts_paging_info.page_index, posts_paging_info.limit, 3)
    });
}

module.exports = {render_list_posts};
