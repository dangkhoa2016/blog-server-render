const axios = require("axios");
var mainHost = process.env.API_URL_REPL;

var query = `
query Get_Posts($page_index: Int, $page_size: Int) {
    posts_paging_info(page_index: $page_index, page_size: $page_size) {
        data {
          id, title, summary, photo, comments{id}, createdAt, updatedAt, status, user { id, email, name }
        }, current_page, last_page, total
    }
}
`;

var getById = `
query Get_Post($id: ID!) {
  getPost(id: $id) { id, title, summary, content, photo, comments{comment, user {name}}, createdAt, updatedAt, status, user { id, email, name }}
}
`;

var parse_number = function (value) {
    value = parseInt(value);
    if (isNaN(value))
        value = 0;
    return value;
}

var default_page_size = 3;

/* Show the list of posts */
const get_list = async (page_index, page_size) => {
    var response = { data: {} };
    try {
        page_size = parse_number(page_size);
        if (page_size > 10 || page_size < 1)
            page_size = default_page_size;
        page_index = parse_number(page_index);
    if (page_index < 1)
        page_index = 1;

        response = await axios.post(
            mainHost,
            { query, variables: { page_index, page_size } },
            { timeout: 10000 }
        );

        console.log("receive from repl", response.status, response.data);
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log("error.response.data", error.response.data);
            console.log("error.response.status", error.response.status);
            // console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log("error.request", error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
        }
    }

    var data = (response.data && response.data.data && response.data.data.posts_paging_info) || {};
    data.page_size = page_size;
    return data;
};

/* Show post */
const get_detail = async (id) => {
    var response = { data: {} };
    try {
        response = await axios.post(
            mainHost,
            { query: getById, variables: { id } },
            { timeout: 10000 }
        );

        console.log("receive from repl", response.status, response.data);
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log("error.response.data", error.response.data);
            console.log("error.response.status", error.response.status);
            // console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log("error.request", error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
        }
    }

    return response.data && response.data.data && response.data.data.getPost;
};

module.exports = {
    get_list,
    get_detail
};
