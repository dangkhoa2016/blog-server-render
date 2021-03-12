const axios = require("axios");
var mainHost = process.env.API_URL_GRAPHCMS;

var query = `
query Get_Posts($first: Int, $skip: Int) {
  posts(first: $first, skip: $skip, where: {state: "active"}) {
    id,photo,title,summary,comments{id}
    updatedAt,createdAt
    author {id,name,email}
  }
}
`;

var getById = `
query Get_Post($id: ID!) {
  post(where: {id: $id}) {
    id,photo,title,summary,content {text}, comments { comment, author {name} }
    updatedAt,createdAt
    author {id,name,email}
  }
}
`;

var parse_number = function (value) {
    value = parseInt(value);
    if (isNaN(value))
        value = 0;
    return value;
}

var GraphCMS_page_size = 4;
/* Show the full list of posts */
const get_list = async (page_index, page_size) => {
    var response = { data: {} };
    try {
        page_size = parse_number(page_size);
        if (page_size > 10 || page_size < 1)
            page_size = GraphCMS_page_size;
        page_index = parse_number(page_index);
        if (page_index < 1)
            page_index = 1;
        var skip = (page_index - 1) * GraphCMS_page_size;
        response = await axios.post(
            mainHost,
            { query, variables: { 'first': GraphCMS_page_size, skip } },
            { timeout: 10000 }
        );

        console.log("receive from graphcms", response.status, response.data);
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

    var data = (response.data && response.data.data) || {};
    data.page_index = page_index;
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

        console.log("receive from graphcms", response.status, response.data);
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

    return response.data && response.data.data.post;
};

module.exports = {
    get_list,
    get_detail
};
