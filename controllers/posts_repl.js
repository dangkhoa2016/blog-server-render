const {blogs_repl} = require('../api');
const paginate = require('../libs/paginate');

const render_list_posts = async (req, res) => {
    var { page_index, page_size } = req.query;
    const posts_paging_info = await blogs_repl.get_list(page_index, page_size);

    res.render('blogs_repl', {
        posts: posts_paging_info.data,
        type: 'blogs_repl',
        title: 'Blog using Repl',
        pages_info: paginate(posts_paging_info.total, posts_paging_info.current_page, posts_paging_info.page_size, 3)
    });
}

module.exports = {render_list_posts};
