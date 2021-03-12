const api = require('../api');
const marked = require("marked");

const render_post_detail = async function (req, res) {
    var { id, type } = req.params;
    const post = await api[type].get_detail(id);
    const comments = post ? (post.linkedFrom ? post.linkedFrom.commentCollection.items : post.comments) : [];
    var body = (post && post.body) ? marked(post.body) : null;
    res.render('post_detail', { post, type, title: post ? post.title : '', body, comments });
}

module.exports = {render_post_detail};
